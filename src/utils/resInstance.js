import axios from "axios";

export const resinstance = axios.create({
  baseURL: "https://etechpolltesting.onrender.com",
});
