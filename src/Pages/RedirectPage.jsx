import { AppContext } from "@/context/AppContext";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { routes } from "@/Routes/routes";
import { userDetails } from "@/services/user.services";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

const Redirect = () => {
  const { user, setUser } = useContext(AppContext);
  const { errorHandler } = useErrorHandler() ;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ;  
  const nav = useNavigate() ;

    const handleUser = async () => {
    try {
      setUser((prev) => ({ ...prev, loading: true }));
      const data = await userDetails();
      setUser((prev) => ({ ...prev, loading: false, data: data.data }));
      nav(routes.scheduling)
    } catch (error) {
      errorHandler(error);
    }
  };


  useEffect(() => {
    if (!token) {
      return <Navigate to={routes.login} />;
    }
    localStorage.setItem("token" , token ) ;
    handleUser() ;
  }, []);

  return <div className="min-h-[100vh] flex justify-center items-center">
   <Loader2 className="animate-spin" size={30}/>
  </div>;
};

export default Redirect;
