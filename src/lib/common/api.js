import axios from "axios";
import { getBackendHost } from "../backend";
import useStore from "@/store";


// Konfigurasi Headers
const headersReg = {
  "Content-Type": "application/json",
  Authorization: "",
  Accept: "*/*"
};

// Konfigurasi URL API menggunakan AXIOS
// getBackendHost() manggil dari .env
export const Api = axios.create({
  baseURL: getBackendHost(), // http://localhost:8000/api/
  headers: headersReg
});

// Setiap pemanggilan API dia bakal secara dinamis pake 
// token yang user dapet setelah login
Api.interceptors.request.use(
  async (config) => {
    // token diambil dari store
    const { userToken } = useStore.getState();

    if (config?.headers) {
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
