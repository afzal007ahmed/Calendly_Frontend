import React, { useContext, useEffect } from "react";
import { userDetails } from "./services/user.services";
import useErrorHandler from "./ErrorHandler/useErrorHandler";
import { AppContext } from "./context/AppContext";

const AuthProvider = ({ children }) => {
  const { errorHandler } = useErrorHandler();
  const { setUser } = useContext(AppContext);
  const token = localStorage.getItem("token");

  const handleUser = async () => {
    try {
      setUser((prev) => ({ ...prev, loading: true }));
      const data = await userDetails();
      setUser((prev) => ({ ...prev, loading: false, data: data.data }));
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    handleUser();
  }, []);

  return children;
};

export default AuthProvider;
