import axios from "../api/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

//createContext() creates an empty context object that will be used to
//share the authentication state and functions between components.
const AuthContext = createContext();

// const ACTIONS = {
//   setToken: "setToken",
//   clearToken: "clearToken",
// };

// This component serves as the provider for the authentication context.
//It receives children as a prop, which represents
//the child components that will have access to the
//authentication context.
export const AuthProvider = ({ children }) => {
  //token represents the authentication token.
  const [access_token, setAccessToken_] = useState(
    localStorage.getItem("access_token")
  );
  const [refresh_token, setRefreshToken_] = useState(
    localStorage.getItem("refresh_token")
  );

  const [branches, setBranch_] = useState([]);
  const [departments, setDepartment_] = useState([]);

  // This function is used to set the new token value.
  // It updates the token state using setToken_() and stores the
  // token value in the local storage using localStorage.setItem().
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setAccessToken = (newToken) => {
    setAccessToken_(newToken);
    localStorage.setItem("access_token", newToken);
  };
  const setRefreshToken = (newToken) => {
    setRefreshToken_(newToken);
    localStorage.setItem("refresh_token", newToken);
  };

  const setBranch = (branch) => {
    setBranch_(branch);
  };
  const setDepartment = (depart) => {
    setDepartment_(depart);
  };

  //This effect runs whenever the token value changes.
  //If the token exists, it sets the
  //authorization header in axios.
  //If the token is null or undefined, it removes
  //the authorization header from axios.
  useEffect(() => {
    if (access_token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [access_token]);

  // The context value includes the token and setToken function.
  // The token value is used as a dependency for memoization.
  const contextValue = useMemo(
    () => ({
      refresh_token,
      access_token,
      setAccessToken,
      setRefreshToken,

      branches,
      setBranch,
      setDepartment,
      departments,
    }),
    [refresh_token, access_token, branches, departments]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//useAuth is a custom hook that can be used in
//components to access the authentication context.

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
