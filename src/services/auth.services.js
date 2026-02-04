import { config } from "@/config";
import axios from "axios";

export const loginService = async(body ) => {
    const response = await axios.post( config.login , body );
    console.log( response.data ) ;
    localStorage.setItem("token" , response.data.token) ;
    return response.data ;

}