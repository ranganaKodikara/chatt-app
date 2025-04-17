import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "developement"
      ? import.meta.env.VITE_API_URL
      : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
