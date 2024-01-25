import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginAuthenticated: false,
  loading: true,
  error: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoginAuthenticated = false;
      state.error = null;
    },
    signupFail(state, action) {
      state.isAuthenticated = false;
      state.isLoginAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },

    signinSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload;
      state.isLoginAuthenticated = true;
      state.error = null;
      state.role = action.payload.role;
    },
    signinFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isLoginAuthenticated = false;
    },
    signout(state) {
      state.isAuthenticated = false;
      state.isLoginAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
});

export const {
  signupSuccess,
  signupFail,
  signinSuccess,
  signinFail,
  signout,
  resetError,
} = authSlice.actions;

export default authSlice.reducer;
