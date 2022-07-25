import { Car } from "./Car.js"

export const generateCars = (carNames) => {
  const cars = carNames.map((name) => new Car(name))
  return cars;
}

export const racingGameStore = (function () {
  let cars = [];
  let carTry = 0;

  function setCars (carList) {
    cars = carList;
  }

  function setCarTry (num) {
    carTry = num;
  }

  function getCars () {
    return cars
  }

  function getCarTry () {
    return carTry
  }
 
  return {setCars, setCarTry, getCars, getCarTry}
})()
