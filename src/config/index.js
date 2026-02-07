import { API_PATHS } from "./apiPath";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const config = {
  userDetails: BASE_URL + API_PATHS.user,
  userNameUpdate: BASE_URL + API_PATHS.userNameUpdate,

  login: BASE_URL + API_PATHS.login,
  register: BASE_URL + API_PATHS.register,

  availability: BASE_URL + API_PATHS.availability,
  schedules: BASE_URL + API_PATHS.schedules,

  booking: (username, userId, scheduleId) =>
    BASE_URL + API_PATHS.booking(username, userId, scheduleId),

  meetingDetail: (type) => BASE_URL + API_PATHS.meetingDetail(type),

  google_redirect: BASE_URL + API_PATHS.googleRedirect,

  google_redirect_login: (token) =>
    BASE_URL + API_PATHS.googleRedirectLogin(token),

  confirm_booking: BASE_URL + API_PATHS.confirmBooking,
};
