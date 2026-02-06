const BASE_URL = import.meta.env.VITE_BASE_URL.replace(/\/+$/, "");

const api = (path) => `${BASE_URL}/${path}`;

export const config = {
  userDetails: api("user"),

  login: api("auth/login"),

  register: api("auth/register"),

  availability: api("availability"),

  schedules: api("schedules"),

  userNameUpdate: api("user/name"),

  meetingDetail: (type) => api(`meetings?type=${type}`),

  googleRedirect: api("google/login/auth"),

  googleRedirectLogin: (token) => api(`google/connect/auth?token=${token}`),
};
