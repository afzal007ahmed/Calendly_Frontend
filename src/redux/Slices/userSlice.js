import { createSlice } from "@reduxjs/toolkit"


const initialState = { 
    loading : false ,
    data : null 
}


const userSlice = createSlice({
    name : "userSlice" ,
    initialState : initialState , 
    reducers : {
        fetchUserLoading : (state) => {
            state.loading = true ; 
        },
        fetchUserSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
        },
        fetchUserFailed : ( state ) => {
            state.loading = false ;
        },
        userReset : () => initialState
    }
})


export const { fetchUserFailed , fetchUserLoading , fetchUserSuccess , userReset } = userSlice.actions ;
export default userSlice.reducer ;