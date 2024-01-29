import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  poll: [],
  loading: null,
  error: null,
  editId: null,
  page: 1,
  voteLoader: null,
  voteId: null,
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
      state.loading = action.payload.loading;
    },
    deletePoll(state, action) {
      state.loading = action.payload.loading;
    },
    deletePollOption(state, action) {
      state.loading = action.payload.loading;
    },
    getPollPage(state, action) {
      state.page = action.payload;
    },
    getPollVoted(state) {
      state.voteLoader = false;
    },
    votestarted(state, action) {
      state.voteLoader = true;
      state.voteId = action.payload;
    },
  },
});

export const {
  getAllPolls,
  editPollTitle,
  getPollVoted,
  votestarted,
  deletePoll,
  deletePollOption,
} = pollSlice.actions;

export default pollSlice.reducer;
