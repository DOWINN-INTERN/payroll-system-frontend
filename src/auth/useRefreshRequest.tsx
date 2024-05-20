import axios from "../api/axios";
import { useAuth } from "./AuthProvider";

export const useRefreshRequest = () => {
  const { setAccessToken } = useAuth();
  const { refresh_token } = useAuth();
  const { setRefreshToken } = useAuth();
  const { access_token } = useAuth();

  const refresh = async () => {
    try {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + refresh_token;

      const response = await axios.post("/auth/refresh");

      setRefreshToken(response.headers["refresh-token"]);

      setAccessToken(response.headers["access-token"]);

      return response.headers["access-token"];
    } catch (error) {}
  };

  return refresh;
};
