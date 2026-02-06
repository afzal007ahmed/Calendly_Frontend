import { configureStore } from "@reduxjs/toolkit"
import ScheduleSlice from "./ScheduleSlice"

export const store = configureStore({
    reducer : {
        ScheduleSlice
    } 
})




