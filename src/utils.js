import { CAR_NAME_MAX_LENGTH, CAR_NAME_MIN_LENGTH } from "./constants";

export const getRandomIntInclusive = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

export const isString = (value) =>
  typeof value === "string" || value instanceof String;

// https://www.slingacademy.com/article/ways-to-generate-random-strings-in-javascript/
export const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateRandomCarNames = (count) => {
  const carNames = new Set();

  while (carNames.size < count) {
    const carName = generateRandomString(
      getRandomIntInclusive(CAR_NAME_MIN_LENGTH, CAR_NAME_MAX_LENGTH)
    );
    carNames.add(carName);
  }
  return Array.from(carNames);
};
