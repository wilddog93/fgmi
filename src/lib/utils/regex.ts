export const phoneRegex = new RegExp(/^(08|8|628)[0-9]{5,11}$/);
export const indonesianPhoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;
export const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
export const nikRegex = new RegExp(
  "^([1-9][0-9])\\d{2}\\d{2}([04][1-9]|[12][0-9]|3[01]|[4567][1-9]|[56][0-9]|7[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$"
);
export const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export default {
  phoneRegex,
  indonesianPhoneRegex,
  emailRegex,
  nikRegex,
  passwordRegex,
};
