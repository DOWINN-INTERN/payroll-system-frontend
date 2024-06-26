import { axiosRefreshRequest } from "../api/axios";
import { useRefreshRequest } from "./useRefreshRequest";
import { useAuth } from "./AuthProvider";

import { useEffect } from "react";

export const useAxiosRefreshRequest = () => {
  const refresh = useRefreshRequest();
  const { access_token, refresh_token } = useAuth;

  useEffect(() => {
    const interceptor = axiosRefreshRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          axiosRefreshRequest.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosRefreshRequest(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => axiosRefreshRequest.interceptors.response.eject(interceptor);
  }, [access_token, refresh_token, refresh]);

  return axiosRefreshRequest;
};
