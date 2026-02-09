
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { fetchUserFailed, fetchUserLoading, fetchUserSuccess } from "@/redux/Slices/userSlice";
import { routes } from "@/Routes/routes";
import { userDetails } from "@/services/user.services";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router";

const Redirect = () => { 
  const dispatch = useDispatch() ;
  const { errorHandler } = useErrorHandler() ;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ;  
  const nav = useNavigate() ;

    const handleUser = async () => {
    try {
      dispatch(fetchUserLoading()) ;
      const data = await userDetails();
      dispatch( fetchUserSuccess( data ) ) ;
      nav(routes.scheduling)
    } catch (error) {
      dispatch( fetchUserFailed())
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
