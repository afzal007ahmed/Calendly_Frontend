import { AppContext } from "@/context/AppContext";
import { routes } from "@/Routes/routes";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const useErrorHandler = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  function errorHandler(error) {
    if (error.response.status === 401) {
      setUser(() => {
        localStorage.removeItem("token");
        return { data: null, loading: false };
      });

      if (error.response.data.code === "PASSWORD_MISMATCH") {
        toast.error("Password doesn't match");
        return;
      }
      const message = error.response?.data?.message;

      if (path !== routes.login) {
        toast.error(message);
      }
      navigate(routes.login);
    } else if (error.response.status === 404) {
      if (error.response.data.code === "USER_NOT_FOUND") {
        toast.error("User not found. Please register.");
        return;
      }
    }
  }
  return {
    errorHandler,
  };
};

export default useErrorHandler;
