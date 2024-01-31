import { getAllPolls } from "../redux/Slices/pollSlice";
import { instance } from "./axiosInstace";

export const fetchLatestPoll = async (dispatch) => {
  try {
    const response = await instance.get("/list_polls");
    dispatch(getAllPolls(response.data.data));
  } catch (error) {
    console.error(error);
  }
};
