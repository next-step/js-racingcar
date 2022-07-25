import { racingGameStore } from "./index.js"

export const initRacing = function () {
  const {getCars, getCarTry} = racingGameStore
  console.log('init racing')
  let tryCount = getCarTry();
  const cars = getCars();
  
  console.log(cars, tryCount)
}
