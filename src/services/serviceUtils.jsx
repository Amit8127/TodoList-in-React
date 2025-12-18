import axios from "axios";

// export const BaseURL = "http://localhost:8000";
export const BaseURL = "https://todolist-apis.onrender.com";

export const api = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

// Health check URL (no auth required)
const HEALTH_CHECK_URL = `${BaseURL}/health`;

// Function to check health (no credentials)
export const checkHealth = async () => {
  try {
    const response = await axios.get(HEALTH_CHECK_URL);
    console.log("Health check success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error.message);
    throw new Error(error.message);
  }
};

// Automatic ping every 14 minutes
setInterval(async () => {
  try {
    await checkHealth();
  } catch (error) {
    console.error("Automatic health check error:", error.message);
  }
}, 14 * 60 * 1000); // 14 minutes