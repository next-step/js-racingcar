import {carNameDom, tryNumberDom} from "../source/source.js";
import {startRacing} from "../racingCode/startRacing.js";

let carNameArray,tryNumber;

const splitCarName = (val)=>val.split(',');

const carButtonHandler = ()=>{
  carNameArray = splitCarName(carNameDom.value);
}

const tryButtonHandler = ()=>{
  tryNumber = tryNumberDom.value;
  startRacing(tryNumber,carNameArray);
}

export {carButtonHandler,tryButtonHandler};
