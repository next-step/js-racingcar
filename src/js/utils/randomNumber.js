import { NUMBERIC_CONDITIONS } from "./constants.js";

export const randomNumber = () => {
  return Math.floor(
    Math.floor(
      Math.random() * (NUMBERIC_CONDITIONS.MAX + 1 - NUMBERIC_CONDITIONS.MIN)
    ) + NUMBERIC_CONDITIONS.MIN
  );
};
