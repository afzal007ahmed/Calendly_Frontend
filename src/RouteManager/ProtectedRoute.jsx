import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const token = localStorage.getItem("token");
  if (!user.data || !token) {
    return <p>Loggin out...</p>;
  }
  return children;
};

export default ProtectedRoute;
