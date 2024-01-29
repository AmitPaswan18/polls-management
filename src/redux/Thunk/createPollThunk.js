import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";
import {
  createPollFailure,
  createPollStart,
  createPollSuccess,
} from "../Slices/createPollSlice";
export const createNewPoll = createAsyncThunk(
  "poll/addNewOption",
  async ({ values }, { dispatch }) => {
    try {
      dispatch(createPollStart({ loading: true }));

      const response = await instance.get(
        `/add_poll?title=${values.title}&options=${values.options.join("____")}`
      );

      if (response.status === 200) {
        dispatch(createPollSuccess());
        return response.data;
      } else {
        dispatch(createPollFailure());
        throw new Error("Failed to add new option");
      }
    } catch (error) {
      dispatch(createPollFailure());
      throw error;
    }
  }
);
