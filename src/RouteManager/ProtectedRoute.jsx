import { AppContext } from "@/context/AppContext";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const token = localStorage.getItem("token");
  if (!user.data || !token) {
    return <div className="min-h-full flex items-center justify-center" >
        <Loader2 className="animate-spin" size={30} />
    </div>;
  }
  return children;
};

export default ProtectedRoute;
