import axios from "axios";

export const BaseURL = "http://localhost:8000";

export const api = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});
