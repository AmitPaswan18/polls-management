import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import pollSlice from "../Slices/pollSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollSlice,
  },
});

export default store;
