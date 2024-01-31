import { createSlice } from "@reduxjs/toolkit";
import { signupAsync } from "../Thunk/signupThunk";
import { signinAsync } from "../Thunk/loginThunk";

export const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginAuthenticated: false,
  loading: false,
  loginerror: null,
  signuperror: null,
  role: null,
  error: null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signinSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoginAuthenticated = true;
      state.role = action.payload.role;
      state.error = null;
    },
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
    signout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.isLoginAuthenticated = false;
      state;
    },
    signinFail(state, action) {
      state.loading = false;
      state.isLoginAuthenticated = false;
      state.loginerror = action.payload;
      state.user = null;
    },

    signupLoading(state, action) {
      state.loading = action.payload;
    },
    resetError(state) {
      state.error = null;
      state.loginerror = null;
      state.signuperror = null;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.signuperror = null;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.signuperror = action.error.message;
      });

    builder
      .addCase(signinAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
        state.isLoginAuthenticated = action.payload.loginauth;
        state.loginerror = null;
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoginAuthenticated = false;
        state.loginerror = action.payload;
      });
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
