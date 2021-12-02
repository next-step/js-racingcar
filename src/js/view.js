import { $ } from "./utils.js";

export const inputField = {
  raceForm: $(".", "race-form"),
  carsNameButton: $(".", "cars-name-btn"),
  tryCountButton: $(".", "try-count-btn"),
};

export const raceResult = {
  raceStatus: $(".", "race-status"),
};

export const setStyle = (state) => {
  switch (state) {
    case "inputCarsName":
      $(".", "try-count").classList.remove("hide");
      break;
    case "inputTryCount":
      $(".", "race-status").classList.remove("hide");
      break;
  }
};
