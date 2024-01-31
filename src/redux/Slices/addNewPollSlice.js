import { createSlice } from "@reduxjs/toolkit";

export const pollSlice = createSlice({
  name: "newPoll",
  initialState: {
    loading: false,
    singlePoll : null, 
    editPoll : null
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

    getsinglePollStart(state, action) {
      state.loading = action.payload.loading;
    },

    getSinglePollSuccess(state, action) {
      state.singlePoll = action.payload
      state.editPoll = action.payload.editPoll;
      state.loading = false;
    },

    getSinglePollFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  addNewOptionStart,
  addNewOptionSuccess,
  addNewOptionFailure,
  getSinglePollFailure,
  getSinglePollSuccess,
  getsinglePollStart,
} = pollSlice.actions;

export default pollSlice.reducer;
