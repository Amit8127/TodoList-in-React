import axios from "axios";

export const BaseURL = "http://localhost:8000";
// export const BaseURL = "https://amittodoapp.netlify.app";

export const api = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});
