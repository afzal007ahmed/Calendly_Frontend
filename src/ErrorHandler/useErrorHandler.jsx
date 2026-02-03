import { routes } from '@/Routes/routes';
import React from 'react'
import { useNavigate } from 'react-router'

const useErrorHandler = () => {
    const navigate = useNavigate() ;
    function errorHandler(error) {
       if( error.response.status === 401 ) {
        localStorage.removeItem("token")
        navigate( routes.login ) ;
       }
    }
  return {
    errorHandler
  }
}

export default useErrorHandler