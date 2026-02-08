import { AppContext } from "@/context/AppContext";
import { routes } from "@/Routes/routes";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useErrorHandler = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  function errorHandler(error) {
    console.error("API Error:", error);

    // ✅ IMPORTANT: Handle network / no-response errors first
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return;
    }

    const { status, data } = error.response;

    // ✅ 401 Unauthorized
    if (status === 401) {
      setUser(() => {
        localStorage.removeItem("token");
        return { data: null, loading: false };
      });

      if (data?.code === "PASSWORD_MISMATCH") {
        toast.error("Password doesn't match");
        return;
      }

      toast.error(data?.message || "Session expired");
      navigate(routes.login);
      return;
    }

    // ✅ 404 Not found
    if (status === 404) {
      if (data?.code === "USER_NOT_FOUND") {
        toast.error("User not found. Please register.");
        return;
      }

      toast.error(data?.message || "Not found");
      return;
    }

    // ✅ 409 Conflict
    if (status === 409) {
      if (data?.code === "USER_DUPLICATE") {
        toast.error(data?.message + " please login");
        return;
      }

      toast.error(data?.message || "Conflict error");
      return;
    }

    // ✅ 403 Forbidden
    if (status === 403) {
      if (data?.code === "USER_PASSWORD_MISSING") {
        toast.error(data?.message + ". Try login from Google.");
        return;
      }

      if (data?.code === "CALANDER_PERMISSION_MISSING") {
        if (token) {
          navigate(routes.scheduling);
        } else {
          navigate(routes.login);
        }

        toast.error("Please check the box for calendar permission.");
        return;
      }

      toast.error(data?.message || "Access denied");
      return;
    }

    // ✅ Fallback
    toast.error(data?.message || "Something went wrong");
  }

  return {
    errorHandler,
  };
};

export default useErrorHandler;
