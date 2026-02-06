import { configureStore } from "@reduxjs/toolkit";
import ScheduleSlice from "./ScheduleSlice";
import meetingReducer from "./meetingSlice";

export const store = configureStore({
  reducer: {
    ScheduleSlice,
    meeting: meetingReducer,
  },
});
