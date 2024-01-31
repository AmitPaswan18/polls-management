import { createSlice } from "@reduxjs/toolkit";

export const createPollSlice = createSlice({
  name: "poll",
  initialState: {
    loading: false,
  },
  reducers: {
    createPollStart(state, action) {
      state.loading = action.payload.loading;
    },

    createPollSuccess(state) {
      state.loading = false;
    },

    createPollFailure(state) {
      state.loading = false;
    },
  },
});

export const { createPollFailure, createPollStart, createPollSuccess } =
  createPollSlice.actions;

export default createPollSlice.reducer;
