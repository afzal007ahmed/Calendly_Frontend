export const API_PATHS = {
  user: "user",
  userNameUpdate: "user/name",

  login: "auth/login",
  register: "auth/register",

  availability: "availability",
  schedules: "schedules",

  booking: (username, userId, scheduleId) =>
    `book/${username}/${userId}/${scheduleId}`,

  meetingDetail: (type) => `meetings?type=${encodeURIComponent(type)}`,

  googleRedirect: "google/login/auth",

  googleRedirectLogin: (token) =>
    `google/connect/auth?token=${encodeURIComponent(token)}`,
};
