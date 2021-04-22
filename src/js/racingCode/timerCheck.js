import {
  compareCountAndTryNumber,
  goCarMove,
} from "./carMoveAndCompareCount.js";

let isGo = [];

let tryObject = {};

const timerCheck = (count, carNameArray, tryNumber, carMovingDom) => {
  tryObject.count = count;
  tryObject.tryNumber = tryNumber;
  tryObject.timer = setInterval(() => {
    isGo = carNameArray.map(() =>
      Math.floor(Math.random() * 10) >= 4 ? true : false
    );
    goCarMove(carNameArray, isGo, carMovingDom);
    tryObject.count++;
    compareCountAndTryNumber(tryObject);
  }, 1000);
};

export { timerCheck };
