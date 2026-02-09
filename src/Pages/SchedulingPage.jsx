import { config } from "@/config";
import GoogleButton from "@/components/CustomComponents/GoogleButton";
import ScheduleCreate from "@/components/CustomComponents/ScheduleCreate";
import ScheduleListing from "@/components/CustomComponents/ScheduleListing";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import {
  fetchSchedules,
  scheduleError,
  scheduleSuccess,
} from "@/redux/Slices/scheduleSlice";
import { getSchedules } from "@/services/schedule.services";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

const Scheduling = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const { errorHandler } = useErrorHandler();
  const message = searchParams.get("message");
  if (message) {
    toast.error(message);
  }
  const schedules = useSelector((state) => state.ScheduleReducer);
  const [googleCalenderMissing, setGoogleCalenderMissing] = useState(false);

  async function getSchedulesForUser() {
    try {
      dispatch(fetchSchedules());
      const response = await getSchedules();
      setGoogleCalenderMissing(false);
      dispatch(scheduleSuccess(response));
    } catch (error) {
      dispatch(scheduleError());
      if (
        error.response.status === 403 &&
        error.response.data.code === "GOOGLE_ACCESS_REQUIRED"
      ) {
        setGoogleCalenderMissing(true);
      } else {
        errorHandler(error);
      }
    }
  }

  useEffect(() => {
    getSchedulesForUser();
  }, []);

  return (
    <div>
      {googleCalenderMissing ? (
        <GoogleButton route={config.google_redirect_login(token)} />
      ) : (
        <ScheduleCreate />
      )}
      {schedules.data && (
        <ScheduleListing
          schedules={schedules.data}
          getSchedulesForUser={getSchedulesForUser}
        />
      )}
    </div>
  );
};

export default Scheduling;
