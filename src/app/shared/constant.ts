import { environment } from '@src/environments/environment';

const BASEURL = environment.BASE_URL;
const BASE = environment.BASE;
export const routes = {
  REGISTER: `${BASEURL}/account/signup`,
  COMPLETESIGNUP: `${BASEURL}/account/complete-signup`,
  LOGIN: `${BASEURL}/account/login`,
  SOCIALAUTH: `${BASEURL}/account/social-login`,
  FORGOTPASSWORD: `${BASEURL}/account/forgot-password`,
  RESETPASSWORD: `${BASEURL}/account/reset-password`,
  VERIFYOTP: `${BASEURL}/account/verify-otp`,
  GROUP: {
    CREATE: `${BASEURL}/group/create`,
    LIST: `${BASEURL}/group/get-all`,
    EDIT: `${BASEURL}/challenge/edit`,
    DELETE: `${BASEURL}/challenge/delete`,
  },
  TASK: {
    CREATE: `${BASEURL}/task/create`,
    LIST: `${BASEURL}/task/list`,
    GETUSERTASKS: `${BASEURL}/task/get-user-task`,
    DETAIL: `${BASEURL}/task/get-task`,
  },
  LEVEL: {
    LIST: `${BASEURL}/level/list`,
    ALL: `${BASEURL}/level/get-all`,
    CREATE: `${BASEURL}/level/create`,
    UPDATE: `${BASEURL}/level/edit`,
  },
  TRACK: {
    LIST: `${BASEURL}/track/list`,
    ALL: `${BASEURL}/track/get-all`,
    CREATE: `${BASEURL}/track/create`,
    UPDATE: `${BASEURL}/track/edit`,
  },
  PARTICIPANT: {
    JOIN: `${BASEURL}/challenge/join`,
    LIST: `${BASEURL}/participant/get-joined-challenges`
  },
  DASHBOARD: {
    ORGANIZER: `${BASEURL}/dashboard/organizer`
  },
  CLOUDINARY: `https://api.cloudinary.com/v1_1/eskye/image/upload`
};

export const SystemConstant = {
  ENCRYPTIONKEY: '</@$!!codechallenger&!!)/>',
  RSA: `MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
  WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
  aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
  AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
  xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
  m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
  8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
  z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
  rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
  V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
  aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
  psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
  uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876MIGfMA0GCSqGSIb3DQEBA
  QUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB`,
  SESSIONKEY: '_hhaomssrhy234_',
  IMAGE: BASE + '/upload/',
  LEVEL_ACCESS: {
    s: 'Student',
    m: 'Mentor',
    a: 'Admin'
  },
  PREFIX: 'hmo'

};

export enum NotificationType{
    success = 1,
    error,
    warning
}

export const AlertCssClass = {
  success : 'alert alert-success alert-dismissible',
  error : 'alert alert-danger alert-dismissible',
  info : 'alert alert-info alert-dismissible',
  warning : 'alert alert-warning alert-dismissible',
};

export const IconCssClass = {
  success: 'fa fa-check',
  error: 'fa fa-close',
  warning: 'fa fa-exclamation-triangle',
};

export const UserTypes = {
  organizer: 'Organizer',
  participant: 'Participant',
  admin: 'Admin'
};

export const Pages = {
  signup: 'signup',
  login: 'login'
};

export enum notifications {
  success = 'Success Notification',
  error = 'Error Notification',
  warn = 'Warning Notification',
  info = 'Info Notification'
}


