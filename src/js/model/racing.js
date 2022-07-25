import { racingGameStore } from "./index.js"

export const initRacing = function () {
  const {getCars, getCarTry} = racingGameStore
  console.log('init racing')
  console.log(getCars(), getCarTry())
}
