import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://horseaorund-server.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
