import { $, $all } from "../utils/dom.js";
import { COMPONENT } from "../utils/selector.js";
import { carForwardTemplate, carTemplate } from "./racingCar.js";

export default function RacingProcess() {
  const $process = $(COMPONENT.CAR_LIST);

  this.moveAtTime = (cars, time) => {
    const movable = cars.areMovableTime(time);
    $all(COMPONENT.CARS).forEach((element, index) => {
      movable[index] ? element.appendChild(carForwardTemplate()) : "";
    });
  }

  this.init = cars => {
    cars.getNames().forEach(name => {
      $process.appendChild(carTemplate(name));
    })
  }


}