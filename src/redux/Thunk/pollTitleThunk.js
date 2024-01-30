import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";
import { updateTitleLoading } from "../Slices/pollTitleSlice";
import { fetchLatestPoll } from "../../utils/fetchLatestdata";
export const updatePollTitleAsync = createAsyncThunk(
  "pollTitle/updatePollTitle",
  async ({ editPollTitleId, editTitle }, { dispatch }) => {
    try {
      dispatch(updateTitleLoading(true));

      const response = await instance.get(
        `/update_poll_title?id=${editPollTitleId}&title=${editTitle}`
      );

      if (response.status === 200) {
        fetchLatestPoll(dispatch)
        dispatch(updateTitleLoading(false));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error updating poll title:", error);
      dispatch(updateTitleLoading(false));
      return false;
    }
  }
);
