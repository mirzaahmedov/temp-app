import { authRequestInterceptor } from "@/features/auth/http";
import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3005",
});

httpClient.interceptors.request.use(authRequestInterceptor);

export { httpClient };
