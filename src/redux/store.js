import { configureStore } from "@reduxjs/toolkit"
import ScheduleReducer from "./scheduleSlice"
import availabilityReducer from "./availabilitySlice"

export const store = configureStore({
    reducer : {
        ScheduleReducer,
        availabilityReducer
    } 
})




