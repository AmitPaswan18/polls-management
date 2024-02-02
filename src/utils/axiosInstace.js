import { data } from "autoprefixer";
import axios from "axios";

const baseUrls = import.meta.env.VITE_REACT_BASE_URL;

export const instance = axios.create({
  baseURL: baseUrls,
  data: data,
});
