import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  poll: [],
  loading: true,
  error: null,
  editId: null,
  page: 1,
};

const pollSlice = createSlice({
  name: "poll",
  initialState: initialState,
  reducers: {
    getAllPolls(state, action) {
      state.loading = false;
      state.poll = action.payload;
    },
    editPollTitle(state, action) {
      state.editId = action.payload;
      state.loading = false;
    },
    getPollPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { getAllPolls, editPollTitle } = pollSlice.actions;

export default pollSlice.reducer;
