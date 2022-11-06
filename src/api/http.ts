import axios from "axios";
import {
  cleanTokensData,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "../utils/tokens";

const baseURL = "https://realm.mongodb.com/api/client/v2.0/";

const instance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(addAccessToken);

function addAccessToken(request: any) {
  let token = getAccessToken();

  if (token !== null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}

instance.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error); // ошибка, не связанная с авторизацией
    }

    cleanTokensData();
    const response = await refresh.post("auth/session");

    if (!response.data) {
      return Promise.reject(error); // прокидываем 401 код дальше
    }

    setTokens(response.data.access_token);
    return axios(addAccessToken(error.config));
  }
);

const refresh = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

refresh.interceptors.request.use(addRefreshToken);

function addRefreshToken(request: any) {
  let token = getRefreshToken();

  if (token !== null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}

export { instance, refresh };
