import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";
import { deletePollOption } from "../Slices/pollSlice";
import { deletePoll } from "../Slices/pollSlice";
import { fetchLatestPoll } from "../../utils/fetchLatestdata";

export const deletePollOptionAsync = createAsyncThunk(
  "poll/deletePollOption",
  async ({ deletePollId, optionText }, { dispatch }) => {
    try {
      dispatch(deletePollOption({ loading: true }));

      const response = await instance.get(
        `/delete_poll_option?id=${deletePollId}&option_text=${optionText}`
      );


      if (response.status === 200) {
       fetchLatestPoll(dispatch)
        dispatch(deletePollOption({ loading: false, deletePollId : deletePollId }));
        return true; 
      }
    } catch (error) {
      console.error("Error deleting poll option:", error);
      dispatch(deletePollOption({ loading: false }));
      return false; 
    }
  }
);

export const deletePollAsync = createAsyncThunk(
  "poll/deletePoll",
  async ({ deleteId }, { dispatch }) => {
    try {
      dispatch(deletePoll({ loading: true }));

      const response = await instance.get(`/delete_poll?id=${deleteId}`);

      if (response.status === 200) {
        fetchLatestPoll(dispatch)
        dispatch(deletePoll({ loading: false, editId: deleteId }));
        return true; 
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
      dispatch(deletePoll({ loading: false }));
      return false; 
    }
  }
);
