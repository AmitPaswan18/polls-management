import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";
import { jwtDecode } from "jwt-decode";
import {  signinSuccess, signinFail } from "../Slices/authSlice";


export const autoLoginAsync = createAsyncThunk(
  "auth/autoLogin",
  async (_, { dispatch }) => {
    const autoLoginCredentials = localStorage.getItem("autoLoginCredentials");

    if (autoLoginCredentials) {
      try {
        const { username, password } = JSON.parse(autoLoginCredentials);

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
          dispatch(signinFail(response.data.data));
          console.log("Error during auto-login:", response.data.data);
        }
      } catch (error) {
        console.log("Error in parsing autoLoginCredentials:", error);
        signinFail(error.message, error);
      }
    }
    localStorage.removeItem("autoLoginCredentials");
  }
);
export const signinAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      const response = await instance.get("/login", { params: credentials });

      if (response.data.error === 0) {
        const decoded = jwtDecode(response.data.token);
        dispatch(signinSuccess({ user: decoded, loginauth : true}));
        localStorage.setItem("polltoken", response.data.token);
      } else {
        dispatch(signinFail(response.data.data));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(signinFail(error.message));
    }
  }
);
