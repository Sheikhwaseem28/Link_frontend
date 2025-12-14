import axios from "axios";

const axiosInstance = axios.create({
     // baseURL:"http://localhost:3000",
  baseURL: "https://link-backend-phi.vercel.app",
  timeout: 10000, // 10 seconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

/* ✅ Response Interceptor */
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    // 🛑 Server responded with error
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("❌ Bad Request:", data);
          break;
        case 401:
          console.error("🔐 Unauthorized:", data);
          break;
        case 403:
          console.error("⛔ Forbidden:", data);
          break;
        case 404:
          console.error("🔍 Not Found:", data);
          break;
        case 500:
          console.error("🔥 Server Error:", data);
          break;
        default:
          console.error(`⚠️ Error (${status}):`, data);
      }

      return Promise.reject({
        message: data?.message || "Request failed",
        status,
        data,
      });
    }

    // 🌐 No response (CORS / server down / timeout)
    if (error.request) {
      console.error("🌐 Network Error: No response received");
      return Promise.reject({
        message: "Network error. Please try again later.",
        status: null,
      });
    }

    // ⚙️ Axios setup error
    console.error("⚙️ Axios Error:", error.message);
    return Promise.reject({
      message: error.message || "Unexpected error occurred",
      status: null,
    });
  }
);

export default axiosInstance;



