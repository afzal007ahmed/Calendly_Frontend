import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
};

const availabilitySlice = createSlice({
  initialState: initialState,
  name: "ScheduleSlice",
  reducers: {
    fetchAvailabilityState: (state) => {
      state.loading = true;
    },
    availabilitySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    availabilityError: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchAvailabilityState,
  availabilitySuccess,
  availabilityError,
} = availabilitySlice.actions;
export default availabilitySlice.reducer;
