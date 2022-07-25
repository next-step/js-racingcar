import { racingGameStore } from "./index.js"

export const race = function () {
  const RACE_END_COUNT = 0;
  const {getCars, getCarTry, setCarTry} = racingGameStore
  const tryCount = getCarTry();
  const cars = getCars();

  if(tryCount > RACE_END_COUNT) {
    cars.forEach((car) => {
      car.go()
    })
    setCarTry(tryCount-1)
    race();
  } else {
    return;
  }
}
