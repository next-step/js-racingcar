import {compareCountAndTryNumber,goCarMove} from "./carMoveAndCompareCount.js";

let isGo = [];

const timerCheck = (count,carNameArray,tryNumber,carMovingDom)=>{
  let timer = setInterval(()=> {
    isGo = carNameArray.map(() => Math.floor(Math.random() * 10) >= 4 ? true : false);
    goCarMove(carNameArray, isGo,carMovingDom);
    count++;
    compareCountAndTryNumber(timer,count,tryNumber);
  },1000);
}

export {timerCheck};
