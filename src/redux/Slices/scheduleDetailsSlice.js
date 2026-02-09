import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading : false ,
    data : null 
}

const scheduleDetailsSlice = createSlice({
    name : "scheduleDetailsSlice" ,
    initialState : initialState ,
    reducers : {
        fetchScheduleDetails : ( state ) => {
            state.loading = true ;
        },
        fetchScheduleDetailsSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
        },
        fetchScheduleDetailsFailed : ( state , _action ) => {
            state.loading = false ;
        }
    }
})


export const { fetchScheduleDetails , fetchScheduleDetailsFailed , fetchScheduleDetailsSuccess } = scheduleDetailsSlice.actions ;
export default scheduleDetailsSlice.reducer ;