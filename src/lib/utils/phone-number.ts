import { regex } from "./index";

export const formatPhoneNumberWithCallingCode = (
  callingCode: string,
  phoneNumber: string
): string => {
  let result = "";
  for (let i = 0; i < callingCode.length; i++) {
    result = result.concat("X");
  }
  result = result.concat(phoneNumber);
  return result;
};

export const formatLocalPhoneNumber = (
  phoneNumber: string | null | undefined
): string => {
  if (phoneNumber === undefined || phoneNumber === null) {
    return "";
  }
  if (phoneNumber.substring(0, 1) === "0") {
    return phoneNumber;
  } else if (
    phoneNumber.substring(0, 2) === "62" ||
    phoneNumber.substring(0, 2) === "XX" ||
    phoneNumber.substring(0, 3) === "+62"
  ) {
    return `0${phoneNumber.substring(2, phoneNumber.length)}`;
  }
  return phoneNumber;
};

export const identifyInput = (
  input: string | null | undefined
): "phoneNumber" | "name" | "" => {
  if (input === undefined || input === null) {
    return "";
  }

  if (
    regex.indonesianPhoneRegex.test(input.replace(/\s/g, "")) ||
    input.substring(0, 1) === "0" ||
    input.substring(0, 1) === "+" ||
    input.substring(0, 1) === "6"
  ) {
    return "phoneNumber";
  } else {
    return "name";
  }
};
