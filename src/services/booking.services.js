import axios from "axios";
import { config } from "@/config";

export const getBooking = async (username, userId, scheduleId) => {
    const response = await axios.get(config.booking(username, userId, scheduleId))
    return response.data;
}   