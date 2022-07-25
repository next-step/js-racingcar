import { racingGameStore } from "../model/index.js";
import { getCarComponent, paintCar, showRaceSection } from "../view/car.js";

export const sendCarsToView = function () {
  const {getCars} = racingGameStore
  const carsComponent = getCars().reduce((acc, cur) => {
    return acc + getCarComponent(cur.name).outerHTML
  },'');
  showRaceSection();
  paintCar(carsComponent);
}
