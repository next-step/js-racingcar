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
