import { config } from "@/config"
import axios from "axios"

export const createSchedule = async( body ) => {
   await axios.post(config.confirm_booking , body ) ;
}