import { config } from "@/config"
import axios from "axios"

export const createMeeting = async( body ) => {
   await axios.post(config.confirm_booking , body ) ;
}