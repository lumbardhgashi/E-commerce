import axios, {AxiosHeaders} from "axios";
import { getApiUrl, getToken } from "../helpers";

export const api = axios.create({
  baseURL: getApiUrl(),
  responseType: "json",
  
});

// api.interceptors.request.use(config => {
//   if (!config.headers) config.headers = {} as AxiosHeaders;

//   config.headers["Content-Type"] = "application/json"
  

//   const token = getToken();

//   config.headers.Authorization = token ? `Bearer ${token}` : ``;

//   return config;
// });
