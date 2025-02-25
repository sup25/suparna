import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : "https://quick-orelle-suparna-d194a811.koyeb.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
