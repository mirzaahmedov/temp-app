import { InternalAxiosRequestConfig } from "axios";
import { getSession } from "./session";

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const session = getSession();
  config.headers.Authorization = `Bearer ${session}`;
  console.log(config);
  return config;
};
