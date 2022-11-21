import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://horse-around-backend.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
z;
