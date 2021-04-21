import { NUMBERS } from "../utils/constant.js";
import { $, $all, $child } from "../utils/dom.js";
import { COMPONENT } from "../utils/selector.js";
import { carDelayTemplate, carForwardTemplate, carTemplate, deleteDelay } from "./racingCar.js";

export default function RacingProcess() {
  const $process = $(COMPONENT.CAR_LIST);

  this.moveAtTime = (cars, time) => {
    const movable = cars.areMovableTime(time);
    deleteDelay();
    $all(COMPONENT.CARS).forEach((element, index) => {
      if(movable[index]) $child(element, carForwardTemplate());
    });
  }

  this.delay = () => {
    $all(COMPONENT.CARS).forEach(element => $child(element, carDelayTemplate()));
  }

  this.init = cars =>
    cars.getNames().forEach(name => $child($process, carTemplate(name)));
    
}