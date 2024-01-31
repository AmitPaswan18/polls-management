import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import pollSlice from "../Slices/pollSlice";
import addNewPollSlice from "../Slices/addNewPollSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollSlice,
    newPoll : addNewPollSlice,
  },
});

export default store;
