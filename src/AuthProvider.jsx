import { useEffect } from "react";
import { userDetails } from "./services/user.services";
import useErrorHandler from "./hooks/ErrorHandler/useErrorHandler";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFailed,
  fetchUserLoading,
  fetchUserSuccess,
} from "./redux/Slices/userSlice";

const AuthProvider = ({ children }) => {
  const { errorHandler } = useErrorHandler();
  const user = useSelector((state) => state.userReducer);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

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
    if (!token) return;
    handleUser();
  }, []);

  return children;
};

export default AuthProvider;
