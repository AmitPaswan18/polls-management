import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";

import { signupSuccess, signupFail } from "../Slices/authSlice";

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (userData, { dispatch }) => {

    try {
      const response = await instance.get("/add_user", { params: userData });

      localStorage.setItem(
        "autoLoginCredentials",
        JSON.stringify({
          username: userData.username,
          password: userData.password,
        })
      );
      if (response.data.error === 0) {
        dispatch(signupSuccess(response.data));
      }
    } catch (error) {
      dispatch(signupFail(error.message));
    }
  }
);
