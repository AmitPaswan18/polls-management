import { createSlice } from "@reduxjs/toolkit";

export const pollSlice = createSlice({
  name: "poll",
  initialState: {
    loading: false,
  },
  reducers: {
    addNewOptionStart(state, action) {
      state.loading = action.payload.loading;
    },

    addNewOptionSuccess(state) {
      state.loading = false;
    },

    addNewOptionFailure(state) {
      state.loading = false;
    },
  },
});

export const { addNewOptionStart, addNewOptionSuccess, addNewOptionFailure } =
  pollSlice.actions;

export default pollSlice.reducer;
