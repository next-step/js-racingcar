import { $, $all } from "../utils/dom.js";
import { carForwardTemplate, carTemplate } from "./racingCar.js";

export default function RacingProcess() {
  const $process = $("#car-list");

  this.moveAtTime = (cars, time) => {
    const movable = cars.areMovableTime(time);
    $all("#car").forEach((element, index) => {
      movable[index] ? element.appendChild(carForwardTemplate()) : "";
    });
  }

  this.init = cars => {
    cars.getNames().forEach(name => {
      $process.appendChild(carTemplate(name));
    })
  }

}