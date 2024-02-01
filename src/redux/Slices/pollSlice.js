import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  poll: [],
  loading: null,
  error: null,
  editId: null,
  page: 1,
  voteId: null,
  Voted: false,
  deletePollId: null,
};

const pollSlice = createSlice({
  name: "poll",
  initialState: initialState,
  reducers: {
    getAllPolls(state, action) {
      state.loading = false;
      state.poll = action.payload;
      state.Voted = false

    },
    editPollTitle(state, action) {
      state.editId = action.payload;
      state.loading = action.payload.loading;
    },
    deletePoll(state, action) {
      state.loading = action.payload.loading;
    },
    deletePollOption(state, action) {
      state.deletePollId = action.payload.deletePollId; 
      state.loading = action.payload.loading;
    },
    getPollPage(state, action) {
      state.page = action.payload;
    },

    getvotestarted(state) {
      state.loading = true;
       state.Voted = false;
    },
    getPollVotedSuccess(state, action) {
      state.loading = false;
      state.Voted = true;
      state.voteId = action.payload;
    },
    getPollVotedFail(state, action) {
      state.loading = false;
      state.Voted = false;
      state.error = action.payload;
    },

    fetchSinglePoll(state, action) {
      state.poll = action.payload;
    },
  },
});

export const {
  getAllPolls,
  editPollTitle,
  getPollVotedSuccess,
  getPollVotedFail,
  getvotestarted,
  votestarted,
  deletePoll,
  deletePollOption,
} = pollSlice.actions;

export default pollSlice.reducer;
