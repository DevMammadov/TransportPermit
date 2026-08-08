import axios from "axios";
import { BASE_URL } from "@/data/utils/environments";
import { getStorage } from "@/app/helpers/localStorage";
import { toast } from "react-toastify";

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    AuthenticationToken: "a", // TODO: header will be removed
    "X-Frame-Options": "SAMEORIGIN",
    "Content-Type": "application/json-patch+json",
  },
});

axiosAuth.interceptors.response.use(null, async (error) => {
  if (error.response?.status === 401) {
    // removeStorageItem("user");
    // removeStorageItem("token");
    // location.href = "/";
  }

  if (
    error.response?.data?.content &&
    typeof error.response?.data?.content === "object"
  ) {
    toast.error(Object.values(error.response.data.content).join("\n"));
  } else {
    toast.error(error.response?.data?.message);
  }

  return Promise.reject(error);
});

export const axiosInstance = axiosAuth;

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authenticationtoken = getStorage("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
