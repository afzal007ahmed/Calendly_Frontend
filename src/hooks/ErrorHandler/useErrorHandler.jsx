import { userReset } from "@/redux/Slices/userSlice";
import { routes } from "@/Routes/routes";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useErrorHandler = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function errorHandler(error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      dispatch(userReset());

      if (error?.response?.data?.code === "PASSWORD_MISMATCH") {
        toast.error("Password doesn't match");
        return;
      }
      const message = error?.response?.data?.message;
      toast.error(message);
      navigate(routes.login);
    } else if (error?.response?.status === 404) {
      if (error?.response?.data?.code === "USER_NOT_FOUND") {
        toast.error("User not found. Please register.");
        return;
      } else {
        toast.error(error?.response?.data?.message);
        navigate(routes.login);
        return;
      }
    } else if (error?.response?.status === 409) {
      if (error?.response?.data?.code === "USER_DUPLICATE") {
        toast.error(error?.response?.data?.message + " please login");
        return;
      }
    } else if (error?.response?.status === 403) {
      if (error?.response?.data?.code === "USER_PASSWORD_MISSING") {
        toast.error(
          error?.response?.data?.message + ". try login from google.",
        );
        return;
      } else if (error?.response?.data?.code == "CALANDER_PERMISSION_MISSING") {
        if (token) {
          nav(routes.scheduling);
        } else {
          nav(routes.login);
        }
        toast.error("Please check the box for calender permission.");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error(error?.response?.data?.message);
    }
  }

  return {
    errorHandler,
  };
};

export default useErrorHandler;
