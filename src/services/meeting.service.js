import { config } from "@/config";
import axios from "axios";

export const fetchDetails = async (type) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(config.meetingDetail(type), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteMeeting = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(config.deleteMeeting(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
