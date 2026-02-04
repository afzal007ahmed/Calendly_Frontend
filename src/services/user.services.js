import { config } from "@/config";
import axios from "axios";

export const userDetails = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(config.userDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
