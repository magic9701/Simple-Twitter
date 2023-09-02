import axios from "axios";
const baseURL = "https://twitter-api-on-cloud-run-txr4klwjbq-uc.a.run.app/api";
const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export default axiosInstance;
