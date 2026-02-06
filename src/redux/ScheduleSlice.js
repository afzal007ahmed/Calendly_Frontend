import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false ,
    data : null 
}



const ScheduleSlice = createSlice({
    initialState : initialState ,
    name : "ScheduleSlice" ,
    reducers : {
        fetchSchedules : ( state , _action ) => {
            state.loading = true ;
        },
        scheduleSuccess : ( state , action ) => {
            state.loading  = false ;
            state.data = action.payload.data ;
        },
        scheduleError : (state , _action ) =>{
            state.loading = false 
        }
    }
})



export const { fetchSchedules , scheduleSuccess , scheduleError } = ScheduleSlice.actions ; 
export default ScheduleSlice.reducer ; 