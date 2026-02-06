export const config = {
  userDetails: import.meta.env.VITE_BASE_URL + "user/",
  login: import.meta.env.VITE_BASE_URL + "auth/login",
  register: import.meta.env.VITE_BASE_URL + "auth/register",
  availability: import.meta.env.VITE_BASE_URL + "availability",
  google_redirect: import.meta.env.VITE_BASE_URL + "google/login/auth",
  userNameUpdate: import.meta.env.VITE_BASE_URL + "user/name",
  schedules : import.meta.env.VITE_BASE_URL + 'schedules',
  google_redirect_login: (token) => import.meta.env.VITE_BASE_URL+ 'google/connect/auth' + `?token=${token}` ,
  meetingDetail: (type) =>
    import.meta.env.VITE_BASE_URL + `meetings?type=${type}`,
  
    
}
