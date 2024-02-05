import axios from "axios";
import { getToken, revokeToken } from "shared/api";

export const axiosInstance = axios.create();
  
  axiosInstance.interceptors.request.use(async (config) => {

      const token: string = await getToken()
      const auth: string = token ? `Bearer ${token}` : '';

      config.headers.common['Authorization'] = auth;

      return config;
    }, error => Promise.reject(error)
    )

  axiosInstance.interceptors.response.use(response => response, async (error) => {

        if (error.response && error.response.status === 401) {
            return (await revokeToken()).access
        }

        Promise.reject(error)
    });
//   access in local storage
//   refresh in cookies
//   in slice redux add user