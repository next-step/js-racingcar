import {carNameDom, tryNumberDom,sectionRaceTimes} from "../source/source.js";
import {startRacing} from "../racingCode/startRacing.js";
import {carButtonDom, tryButtonDom} from "../source/source.js";

let carNameArray,tryNumber;
let isSmallerFive=true;

const splitCarName = (val)=>val.split(',');

const carButtonHandler = ()=>{
  carNameArray = splitCarName(carNameDom.value);
  carNameArray.map((val)=>{
    if(val.length > 5){
      alert('안돼');
      isSmallerFive= false;
    }
  })
  if(isSmallerFive) {
    carButtonDom.disabled = true;
    sectionRaceTimes.hidden = false;
  }
  else{
    isSmallerFive =true;
  }
}

const tryButtonHandler = ()=>{
  tryNumber = tryNumberDom.value;
  startRacing(tryNumber,carNameArray);
  tryButtonDom.disabled = true;
}

export {carButtonHandler,tryButtonHandler};
