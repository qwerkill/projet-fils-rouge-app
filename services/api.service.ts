import axios from "axios";
import TokenService from "./token.service";


const instance = axios.create({
    baseURL: process.env.NEXT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


instance.interceptors.request.use(  
    async (config) => {
    const data  = await TokenService.getLocalAccessToken();
  
    if (data && data.accessToken) {
      config.headers["Authorization"] = 'Bearer ' + data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export default instance;