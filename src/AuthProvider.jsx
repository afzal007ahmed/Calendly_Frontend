import { useEffect } from "react";
import { userDetails } from "./services/user.services";
import useErrorHandler from "./hooks/ErrorHandler/useErrorHandler";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFailed,
  fetchUserLoading,
  fetchUserSuccess,
} from "./redux/Slices/userSlice";
import { Navigate } from "react-router";
import { routes } from "./Routes/routes";
import { Loader2 } from "lucide-react";

const AuthProvider = ({ children }) => {
  const { errorHandler } = useErrorHandler();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.userReducer);
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
    if (token) {
      handleUser();
    }
  }, []);

  if (user.loading) {
    return (
      <div className="min-h-full flex items-center w-full justify-center">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );
  }

  if (!token) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

export default AuthProvider;
