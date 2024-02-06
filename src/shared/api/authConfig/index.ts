import axios from "axios";
import { revokeToken } from "shared/api";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/'
});
  
  axiosInstance.interceptors.request.use(async (config) => {

      const token: string = localStorage.getItem('access')!
      const auth: string = token ? `Bearer ${token}` : '';

      config.headers['Authorization'] = auth;

      return config;
    }, error => Promise.reject(error)
    )

  axiosInstance.interceptors.response.use(response => response, async (error) => {

        if (error.response && error.response.status === 401) (await revokeToken()).access

        Promise.reject(error)
    });