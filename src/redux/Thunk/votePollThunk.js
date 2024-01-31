import {
  getPollVotedSuccess,
  getPollVotedFail,
  getvotestarted,
} from "../Slices/pollSlice";
import { fetchLatestPoll } from "../../utils/fetchLatestdata";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/axiosInstace";

export const getVoteAsync = createAsyncThunk(
  "poll/getVoteAsync",
  async ({ votePollId, optionText }, { dispatch }) => {
    try {
      dispatch(getvotestarted({ loading: true }));
       const polltoken = localStorage.getItem("polltoken");
       
      const response = await instance.get(
        `/do_vote?id=${votePollId}&option_text=${optionText}`,
        {
          headers: {
            access_token: polltoken,
          },
        }
      );

      if (response.data.error === 0) {
        fetchLatestPoll(dispatch);
        dispatch(getPollVotedSuccess({ loading: false }));
        return true;
      }
    } catch (error) {
      console.error("Error updating vote :", error);
      dispatch(getPollVotedFail({ loading: false }));
      return false;
    }
  }
);
