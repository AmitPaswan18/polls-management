import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
};

const pollTitleSlice = createSlice({
  name: "pollTitle",
  initialState,
  reducers: {
    updateTitleLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { updateTitleLoading } = pollTitleSlice.actions;

export default pollTitleSlice.reducer;
