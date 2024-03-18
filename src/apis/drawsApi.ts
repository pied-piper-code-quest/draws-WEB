import axios from "axios";
import { environment } from "../global";
import { useAuthStore } from "../stores";

const drawsApi = axios.create({
  baseURL: environment.DRAWS_API_URL,
});

drawsApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { drawsApi };
