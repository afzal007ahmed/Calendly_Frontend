
import { routes } from "@/Routes/routes";
import { Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state ) => state.userReducer )
  const token = localStorage.getItem("token");

  if (user.loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );
  }
  
  if (!token) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

export default ProtectedRoute;
