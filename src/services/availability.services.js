import axios from "axios";
import { config } from "@/config";

export const getAvailability = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(config.availability, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.data;
}   

export const saveAndUpdateAvailability = async (availability) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(config.availability,
        availability, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.data;
}