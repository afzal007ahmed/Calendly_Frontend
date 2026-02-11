import { useEffect } from "react";
import { userDetails } from "./services/user.services";
import useErrorHandler from "./hooks/ErrorHandler/useErrorHandler";

import { useDispatch } from "react-redux";
import {
  fetchUserFailed,
  fetchUserLoading,
  fetchUserSuccess,
} from "./redux/Slices/userSlice";
import { Navigate, useNavigate } from "react-router";
import { routes } from "./Routes/routes";

const AuthProvider = ({ children }) => {
  const { errorHandler } = useErrorHandler();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleUser = async () => {
    try {
      dispatch(fetchUserLoading());
      const data = await userDetails();
      dispatch(fetchUserSuccess(data));
    } catch (error) {
      dispatch(fetchUserFailed());
      errorHandler(error);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);


  if (!token) {
    return <Navigate to={routes.login}  />;
  }

  return children;
};

export default AuthProvider;
