import { MESSAGES } from "./constants.js";

export const isValidNames = (names) => {
  let isCar = true;
  names.split(",").forEach((name) => {
    if (name.length > 5 || name.length < 1) {
      alert(MESSAGES.INVALID_NAME);
      isCar = false;
    }
  });
  return isCar;
};

export const isValidTryTime = (tryTime) => {
  if (!tryTime || tryTime === "0") {
    alert(MESSAGES.INVALID_TRYTIME);
    return false;
  }
  return true;
};
