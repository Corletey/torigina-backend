import axios from "axios";

const healthCheckUrl = "https://torigina.onrender.com/api/v1/health";

export const restartServer = async () => {
  try {
    const response = await axios.get(healthCheckUrl);
    console.log("Health Check Status:", response.data.status);
  } catch (error) {
    console.error("Health Check Failed:", error.message);
  }
};
