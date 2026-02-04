import { config } from "@/config";
import axios from "axios";

export const loginService = async(body ) => {
    const response = await axios.post( config.login , body );
    console.log( response.data ) ;
    localStorage.setItem("token" , response.data.token) ;
    return response.data ;

}


export const registerService = async( body ) => {
    const token = localStorage.getItem("token" ) ;
    const response = await axios.post( config.register , body , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    } );
    return response.data ;
}