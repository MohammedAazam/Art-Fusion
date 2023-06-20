import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { SupaClient } from "../../utils/supabase";
import { Database } from "../../types/supabase";
import { removeOneRequest } from "./requests.slice";

export const fetchIntialProduction = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "/artist/fetchIntialProduction",
  async (_payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const artists = await SupaClient.from("productionProfiles").select(
        "*,user(id,name,image)"
      );
      const data = artists.data;
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue("Check your internent connectivity");
    }
  }
);

export const fetchMyProduction = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "/artist/fetchMyProduction",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const artists = await SupaClient.from("productionProfiles")
        .select("*,user(id,name,image)")
        .eq("artistsId", payload);
      const data = artists.data;
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue("Check your internent connectivity");
    }
  }
);

export const fetchProdutionMembers = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "/artist/fetchProdutionMembers",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const artists = await SupaClient.from("requests")
        .select("user(id,name,image,as)")
        .eq("productionProfilesId", payload)
        .eq("status", "ACCEPTED");
      const data = artists.data?.map((res) => res.user);
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue("Check your internent connectivity");
    }
  }
);

export const addProductionMember = createAsyncThunk<
  any,
  { userId: string; pId: string },
  { rejectValue: string }
>(
  "/artist/addProductionMember",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const artists = await SupaClient.from("requests")
        .update({ status: "ACCEPTED" })
        .eq("artistId", payload.userId)
        .eq("productionProfilesId", payload.pId);
      const data = artists.data;
      if (!artists.error) {
        const res = await SupaClient.from("user")
          .select("id,name,image,as")
          .eq("id", payload.userId)
          .single();
        const data = res.data;
        dispatch(addOneMember(data));
        dispatch(removeOneRequest(payload.userId));
      }
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue("Check your internent connectivity");
    }
  }
);

export const removeProductionMember = createAsyncThunk<
  any,
  { userId: string; pId: string },
  { rejectValue: string }
>(
  "/artist/removeProductionMember",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      await SupaClient.from("requests")
        .delete()
        .eq("artistId", payload.userId)
        .eq("productionProfilesId", payload.pId);
      dispatch(removeOneMember(payload.userId));
      return fulfillWithValue(true);
    } catch (e) {
      return rejectWithValue("Check your internent connectivity");
    }
  }
);

export type Project =
  Database["public"]["Tables"]["productionProfiles"]["Row"] & {
    user: Pick<
      Database["public"]["Tables"]["user"]["Row"],
      "id" | "name" | "image"
    >;
  };

export type Members = Pick<
  Database["public"]["Tables"]["user"]["Row"],
  "id" | "name" | "image" | "as"
>;

const ProjectAdapater = createEntityAdapter<Project>({
  selectId: (project) => project.id,
});

const MembersAdapater = createEntityAdapter<Members>({
  selectId: (member) => member.id,
});

export const ProjectSlice = createSlice({
  name: "project",
  reducers: {
    addOneMember(state, action) {
      MembersAdapater.addOne(state.members, action.payload);
    },
    removeOneMember(state, action) {
      MembersAdapater.removeOne(state.members, action.payload);
    },
  },
  initialState: ProjectAdapater.getInitialState({
    isLoading: false,
    members: MembersAdapater.getInitialState({ isLoading: false }),
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchIntialProduction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchIntialProduction.fulfilled, (state, action) => {
        state.isLoading = false;
        ProjectAdapater.setMany(state, action.payload);
      });

    builder
      .addCase(fetchMyProduction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchMyProduction.fulfilled, (state, action) => {
        state.isLoading = false;
        ProjectAdapater.setMany(state, action.payload);
      });

    builder
      .addCase(fetchProdutionMembers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProdutionMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        MembersAdapater.setMany(state.members, action.payload);
      });
  },
});

export const ProjectSelector = ProjectAdapater.getSelectors<RootState>(
  (state) => state.project
);
export const MembersSelector = MembersAdapater.getSelectors<RootState>(
  (state) => state.project.members
);
export const { addOneMember, removeOneMember } = ProjectSlice.actions;
