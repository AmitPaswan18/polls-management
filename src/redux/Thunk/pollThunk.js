import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";
import {
  addNewOptionStart,
  addNewOptionFailure,
  addNewOptionSuccess,
} from "../Slices/addNewPollSlice";

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
