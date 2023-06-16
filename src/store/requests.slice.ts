import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { SupaClient } from "../../utils/supabase";

type Request = {
  artistId: string;
};

export const addRequest = createAsyncThunk<
  any,
  { artistId: string; projectId: string },
  { rejectValue: any }
>(
  "/requests/add",
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
        .select("artistId")
        .single();
      const id = response.data?.artistId;
      if (!response.error && id) dispatch(addOneRequest({ artistId: id }));
      return fulfillWithValue(true);
    } catch (e) {
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
        .select("*")
        .eq("productionProfilesId", projectId)
        .eq("status", "PENDING");
      return fulfillWithValue(response.data);
    } catch (e) {
      return rejectWithValue(true);
    }
  }
);

const RequestsAdapter = createEntityAdapter<Request>({
  selectId: (Like) => Like.artistId,
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
      .addCase(fetchRequests.pending, (state, action) => {
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
