import { configureStore } from "@reduxjs/toolkit";
import ScheduleReducer from "./scheduleSlice";
import availabilityReducer from "./availabilitySlice";
import meetingReducer from "./meetingSlice";
import schdeuleDetailsReducer from "./scheduleDetailsSlice"

export const store = configureStore({
  reducer: {
    ScheduleReducer,
    availabilityReducer,
    meeting: meetingReducer,
    schdeuleDetailsReducer
  },
});
