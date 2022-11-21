import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://horsearound.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
