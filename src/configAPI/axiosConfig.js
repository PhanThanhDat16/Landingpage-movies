import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://phimapi.com/",
  // timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
