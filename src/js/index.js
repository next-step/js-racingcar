const $ = (selector) => document.querySelector(selector)
const $All = (selector) => document.querySelectorAll(selector)

const [carButtonDom,tryButtonDom, restartButtonDom] = $All(".btn-cyan")
const [carNameDom, tryNumberDom] = $All('.w-100');
let carNameArray,tryNumber,isGo,countArray={};

const splitCarName = (val)=>val.split(',');

const carButtonEvent = carButtonDom.addEventListener('click',()=>{
  carNameArray = splitCarName(carNameDom.value);
  console.log(carNameArray)
})

const tryButtonEvent = tryButtonDom.addEventListener('click',()=>{
  tryNumber = tryNumberDom.value;
  console.log(tryNumber)
  startRacing(tryNumber,carNameArray)
})

const startRacing = (tryNumber,array)=>{
  for(let i=0;i<tryNumber;i++) {
    isGo = array.map((val) => Math.floor(Math.random() * 10) >= 4 ? true : false);
    makeSetting(carNameArray, isGo)
  }
}

const makeSetting = (carNameArray,isGo)=>{
  carNameArray.map((val,idx) => {

    if(countArray[val] !== undefined)
      countArray[val] = isGo[idx] ?  ++countArray[val] : countArray[val];
    else
      countArray[val] = 0;
    console.log(countArray,isGo[idx])})
}
