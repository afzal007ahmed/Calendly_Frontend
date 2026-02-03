import React, { useEffect } from "react";
import { userDetails } from "./services/user.services";
import useErrorHandler from "./ErrorHandler/useErrorHandler";

const AuthProvider = ({ children }) => {

  const { errorHandler } = useErrorHandler();

  useEffect(() => {
    userDetails(errorHandler);
  }, []);

  return children;
};

export default AuthProvider;
