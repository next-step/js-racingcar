import {
  carNameDom,
  tryNumberDom,
  sectionRaceTimes,
  overFiveErrorMessage,
  countErrorMessage,
} from "../source/source.js";
import { startRacing } from "../racingCode/startRacing.js";
import { carButtonDom, tryButtonDom } from "../source/source.js";

let carNameArray, tryNumber;
let isSmallerFive = true;

const splitCarName = (val) => val.split(",");

const carButtonHandler = () => {
  carNameArray = splitCarName(carNameDom.value);
  carNameArray.map((val) => {
    if (val.length > 5) {
      alert(overFiveErrorMessage);
      isSmallerFive = false;
    }
  });
  if (isSmallerFive) {
    carButtonDom.disabled = true;
    sectionRaceTimes.hidden = false;
  } else {
    isSmallerFive = true;
  }
};

const tryButtonHandler = () => {
  tryNumber = tryNumberDom.value;
  if (tryNumber >= 1) {
    startRacing(tryNumber, carNameArray);
    tryButtonDom.disabled = true;
  } else {
    alert(countErrorMessage);
  }
};

export { carButtonHandler, tryButtonHandler };
