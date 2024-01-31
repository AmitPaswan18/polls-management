import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";

import {
  addNewOptionStart,
  addNewOptionFailure,
  addNewOptionSuccess,
  getSinglePollFailure,
  getSinglePollSuccess,
  getsinglePollStart,
} from "../Slices/addNewPollSlice";
import { fetchLatestPoll } from "../../utils/fetchLatestdata";

export const addNewOptionAsync = createAsyncThunk(
  "poll/addNewOption",
  async ({ editPollTitleId, optionText }, { dispatch }) => {
   
    try {
      dispatch(addNewOptionStart({ loading: true }));

      const response = await instance.get(
        `/add_new_option?id=${editPollTitleId}&option_text=${optionText}`
      );

      if (response.status === 200) {
        dispatch(addNewOptionSuccess());
        fetchLatestPoll(dispatch);
        return response.data;
      } else {
        dispatch(addNewOptionFailure());
        throw new Error("Failed to add new option");
      }
    } catch (error) {
      dispatch(addNewOptionFailure());
      throw error;
    }
  }
);

export const fetchSinglePollAsync = createAsyncThunk(
  "poll/singlePoll",
  async (editPollTitleId, { dispatch }) => {
    try {
      dispatch(getsinglePollStart({ loading: true }));

      const response = await instance.get(`list_poll?id=${editPollTitleId}`);
      console.log(response);
      if (response.data.error === 0) {
        dispatch(getSinglePollSuccess(response.data.data));
        fetchLatestPoll(dispatch);
        return response.data;
      } else {
        dispatch(getSinglePollFailure());
        throw new Error("Failed to add new option");
      }
    } catch (error) {
      dispatch(getSinglePollFailure());
      throw error;
    }
  }
);
