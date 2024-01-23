import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    signupFail(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },

    signinSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload;
      state.isLoginAuthenticated = true;
    },
    signinFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    signout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { signupSuccess, signupFail, signinSuccess, signinFail, signout } =
  authSlice.actions;

export default authSlice.reducer;
