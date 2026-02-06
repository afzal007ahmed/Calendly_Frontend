const BASE_URL = import.meta.env.VITE_BASE_URL?.replace(/\/+$/, "");

const api = (path) => `${BASE_URL}/${path}`;

export const config = {
  userDetails: api("user"),
  userNameUpdate: api("user/name"),

  login: api("auth/login"),
  register: api("auth/register"),

  availability: api("availability"),
  schedules: api("schedules"),

  booking: (username, userId, scheduleId) =>
    api(`book/${username}/${userId}/${scheduleId}`),

  meetingDetail: (type) => api(`meetings?type=${encodeURIComponent(type)}`),

  google_redirect: api("google/login/auth"),

  google_redirect_login: (token) =>
    api(`google/connect/auth?token=${encodeURIComponent(token)}`),
};
