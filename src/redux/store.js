import { configureStore } from "@reduxjs/toolkit";
import ScheduleReducer from "./Slices/scheduleSlice";
import availabilityReducer from "./Slices/availabilitySlice";
import meetingReducer from "./Slices/meetingSlice";
import schdeuleDetailsReducer from "./Slices/scheduleDetailsSlice"

export const store = configureStore({
  reducer: {
    ScheduleReducer,
    availabilityReducer,
    meeting: meetingReducer,
    schdeuleDetailsReducer
  },
});
