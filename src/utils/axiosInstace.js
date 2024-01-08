import { data } from "autoprefixer";
import axios from "axios";

// const baseURLS = import.meta.env.VITE_REACT_BASE_URL;

export const instance = axios.create({
  baseURL: "https://etechpolltesting.onrender.com",
  data: data,
});
