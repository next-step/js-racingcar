import { confirmTryNumber } from "./confirmTryNumber.js";

export const enterInputTryNumber = (event) => {
  if (event.keyCode === 13) {
    confirmTryNumber();
  }
};
