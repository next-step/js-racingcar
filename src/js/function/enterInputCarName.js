import { confirmCarName } from "./confirmCarName.js";

export const enterInputCarName = (event) => {
  if (event.keyCode === 13) {
    confirmCarName();
  }
};
