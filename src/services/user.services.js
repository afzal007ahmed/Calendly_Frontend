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

export const userNameChange = async (name) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    config.userNameUpdate,
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
