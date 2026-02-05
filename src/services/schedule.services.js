import axios from "axios";
import { config } from "@/config";

export const getSchedules = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(config.schedules, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.data;
}   


export const createSchedule = async( body ) => {
   const token = localStorage.getItem("token") ;
}