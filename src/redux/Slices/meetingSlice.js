import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upcoming: [],
  past: [],
  loading: false,
  error: null,
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,

  reducers: {
    meetingStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    meetingSuccess: (state, action) => {
      state.loading = false;

      const { type, data } = action.payload;

      if (type === "upcoming") {
        state.upcoming = data;
      } else {
        state.past = data;
      }
    },

    meetingError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { meetingStart, meetingSuccess, meetingError } =
  meetingSlice.actions;

export default meetingSlice.reducer;
