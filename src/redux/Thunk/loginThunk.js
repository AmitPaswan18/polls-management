import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";
import { jwtDecode } from "jwt-decode";

import { loginLoading, signinSuccess, signinFail } from "../Slices/authSlice";

export const autoLoginAsync = createAsyncThunk(
  "auth/autoLogin",
  async (_, { dispatch }) => {
    const autoLoginCredentials = localStorage.getItem("autoLoginCredentials");

    if (autoLoginCredentials) {
      try {
        const { username, password } = JSON.parse(autoLoginCredentials);
        dispatch(loginLoading(true));

        const response = await instance.get("/login", {
          params: {
            username,
            password,
          },
        });

        if (response.data.error === 0) {
          const decoded = jwtDecode(response.data.token);
          dispatch(signinSuccess(decoded));
          localStorage.setItem("polltoken", response.data.token);
        } else {
          console.log("Error during auto-login:", response.data);
        }
      } catch (error) {
        console.log("Error in parsing autoLoginCredentials:", error);

        dispatch(loginLoading(false));
      }
    }
    localStorage.removeItem("autoLoginCredentials");
  }
);

export const signinAsync = createAsyncThunk(
  "auth/signin",
  async (credentials, { dispatch }) => {
    try {
      const response = await instance.get("/login", { params: credentials });
      const decoded = jwtDecode(response.data.token);
      localStorage.setItem("polltoken", response.data.token);
      dispatch(signinSuccess(decoded));
      localStorage.setItem("polltoken", response.data.token);
    } catch (error) {
      dispatch(signinFail(error.message));
    }
  }
);
