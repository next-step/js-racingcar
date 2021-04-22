import {
  carNameDom,
  tryNumberDom,
  sectionRaceTimes,
  Message,
} from "../source/source.js";
import { startRacing } from "../racingCode/startRacing.js";
import { carButtonDom, tryButtonDom } from "../source/source.js";

let carNameArray, tryNumber;
let isSmallerFive = true;

const splitCarName = (val) => val.split(",");
const checkOverFiveError = (val) => {
  if (val.length > 5 || val.length < 1) {
    alert(Message.overFiveError);
    isSmallerFive = false;
  }
};
const applyOverFiveError = () => {
  if (isSmallerFive) {
    carButtonDom.disabled = true;
    sectionRaceTimes.hidden = false;
  } else {
    isSmallerFive = true;
  }
};

const carButtonHandler = () => {
  carNameArray = splitCarName(carNameDom.value);
  carNameArray.map((val) => {
    checkOverFiveError(val);
  });
  applyOverFiveError();
};

const tryButtonHandler = () => {
  tryNumber = tryNumberDom.value;
  if (tryNumber < 1) return alert(Message.countError);
  startRacing(tryNumber, carNameArray);
  tryButtonDom.disabled = true;
};

export { carButtonHandler, tryButtonHandler };
