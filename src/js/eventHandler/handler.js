import {carNameDom, tryNumberDom} from "../source/source.js";
import {startRacing} from "../racingCode/startRacing.js";
import {carButtonDom, tryButtonDom} from "../source/source.js";

let carNameArray,tryNumber;

const splitCarName = (val)=>val.split(',');

const carButtonHandler = ()=>{
  carNameArray = splitCarName(carNameDom.value);
  carButtonDom.disabled = true;
}

const tryButtonHandler = ()=>{
  tryNumber = tryNumberDom.value;
  startRacing(tryNumber,carNameArray);
  tryButtonDom.disabled = true;
}

export {carButtonHandler,tryButtonHandler};
