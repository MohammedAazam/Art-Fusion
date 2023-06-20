import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { SupaClient } from "../../utils/supabase";
import { Members } from "./productions.slice";

export const addRequest = createAsyncThunk<
  any,
  { artistId: string; projectId: string },
  { rejectValue: any }
>(
  "/requests/addRequest",
  async (
    { artistId, projectId },
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    try {
      const response = await SupaClient.from("requests")
        .insert({
          artistId,
          productionProfilesId: projectId,
        })
        .select("user(id,name,image,as)")
        .single();
      if (!response.error) {
        const res = await SupaClient.from("user")
          .select("id,name,image,as")
          .eq("id", artistId)
          .single();
        const data = res.data;
        if (data) dispatch(addOneRequest(data));
      }
      return fulfillWithValue(true);
    } catch (e) {
      console.log(e);
      return rejectWithValue(true);
    }
  }
);

export const removeRequest = createAsyncThunk<
  any,
  { artistId: string; projectId: string },
  { rejectValue: any }
>(
  "/requests/remove",
  async (
    { artistId, projectId },
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    try {
      const response = await SupaClient.from("requests")
        .delete()
        .eq("artistId", artistId)
        .eq("productionProfilesId", projectId);
      if (!response.error) dispatch(removeOneRequest(artistId));
      return fulfillWithValue(true);
    } catch (e) {
      return rejectWithValue(true);
    }
  }
);

export const fetchRequests = createAsyncThunk<
  any,
  { projectId: string },
  { rejectValue: any }
>(
  "/requests/fetchRequest",
  async ({ projectId }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await SupaClient.from("requests")
        .select("user(id,name,image,as)")
        .eq("productionProfilesId", projectId)
        .eq("status", "PENDING");
      return fulfillWithValue(response.data?.map((response) => response.user));
    } catch (e) {
      return rejectWithValue(true);
    }
  }
);

const RequestsAdapter = createEntityAdapter<Members>({
  selectId: (Request) => Request.id,
});

export const RequestsSlice = createSlice({
  name: "requests",
  reducers: {
    addOneRequest: RequestsAdapter.addOne,
    removeOneRequest: RequestsAdapter.removeOne,
  },
  initialState: RequestsAdapter.getInitialState({
    isLoading: false,
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchRequests.pending, (state, _action) => {
        state.isLoading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        if (action.payload.length <= 0) RequestsAdapter.removeAll(state);
        else RequestsAdapter.setMany(state, action.payload);
      });
  },
});

export const RequestsSelector = RequestsAdapter.getSelectors<RootState>(
  (state) => state.requests
);

export const { addOneRequest, removeOneRequest } = RequestsSlice.actions;
