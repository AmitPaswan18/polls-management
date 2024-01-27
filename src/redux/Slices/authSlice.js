import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginAuthenticated: false,
  loading: false,
  loginerror: null,
  signuperror: null,
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
      state.signuperror = null;
    },
    signupFail(state, action) {
      state.isAuthenticated = false;
      state.isLoginAuthenticated = false;
      state.loading = false;
      state.signuperror = action.payload;
    },

    signinSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload;
      state.isLoginAuthenticated = true;
      state.loginerror = null;
      state.role = action.payload.role;
    },
    signinFail(state, action) {
      state.loading = false;
      state.loginerror = action.payload;
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
    loginLoading(state, action) {
      state.loading = action.payload;
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
  loginLoading,
} = authSlice.actions;

export default authSlice.reducer;
