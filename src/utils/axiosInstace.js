import { data } from "autoprefixer";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://etechpolltesting.onrender.com",
  data: data,
});
