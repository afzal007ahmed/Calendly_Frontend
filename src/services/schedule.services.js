import axios from "axios";
import { config } from "@/config";

export const getSchedules = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(config.schedules, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createSchedule = async (body) => {
  const token = localStorage.getItem("token");
  const data = {
    type_of_meeting: body.type,
    duration: body.duration,
    meeting_name: body.title,
    limit : body.limit
  };
  await axios.post(config.schedules, data , {
    headers : {
        Authorization : `Bearer ${token}`
    }
  });
};

export const deleteSelectedIds = async (ids) => {
  const token = localStorage.getItem("token");
  await axios.post(config.deleteSchedules, { ids }, {
    headers : {
        Authorization : `Bearer ${token}`
    }
  });
}
