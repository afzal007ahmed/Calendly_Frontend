import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
};

const ScheduleSlice = createSlice({
  initialState: initialState,
  name: "ScheduleSlice",
  reducers: {
    fetchSchedules: (state) => {
      state.loading = true;
    },
    scheduleSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    scheduleError: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchSchedules, scheduleSuccess, scheduleError } =
  ScheduleSlice.actions;
export default ScheduleSlice.reducer;
