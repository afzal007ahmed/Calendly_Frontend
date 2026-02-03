import { config } from "@/config";
import axios from "axios";

export const userDetails = async (errorHandler) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(config.userDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    errorHandler(error);
  }
};
