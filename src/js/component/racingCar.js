import { BOUNDARY, NUMBERS } from "../utils/constant.js";
import { $all, $child, $element, $text } from "../utils/dom.js";
import { ID, TAG, CAR_ATTRIBUTE } from "../utils/selector.js";

export function RacingCar(inputName) {
  const name = inputName;
  let forward = NUMBERS['INIT_NUM'];

  this.status = () => [name, forward];
  this.getName = () => name;
  this.getForward = () => forward;
  this.move = movable => movable ? forward++ : false;
  this.isMovableTime = time => forward >= time;
}

export function RacingCars() {
  const NAME_INDEX = 0;
  const FORWARD_INDEX = 1;
  const cars = [];
  const movableStrategy = () => Math.random() * NUMBERS.RANDOM_BOUND >= BOUNDARY.FORWARD;
  
  this.setNames = inputNames => {
    cars.splice(0, cars.length);
    if(!Array.isArray(inputNames)) inputNames = [inputNames];
    inputNames.forEach(name => cars.push(new RacingCar(name)));
  };
  
  this.move = tryNum => {
    for (var i = 0; i < tryNum; i++) {
      cars.forEach(car => car.move(movableStrategy()));
    }
  }

  this.winner = () => {
    const maxForward = Math.max(...this.getForward());
    const status = this.getCarsStatus();
    return status.filter(stat => stat[FORWARD_INDEX] === maxForward)
        .map(stat => stat[NAME_INDEX]);
  }

  this.getCarsStatus = () => cars.map(car => car.status());
  this.getForward = () => cars.map(car => car.getForward());
  this.getNames = () => cars.map(car => car.getName());
  this.areMovableTime = time => cars.map(car => car.isMovableTime(time));
}

export const carTemplate = name => {
  const $carName = $text(name);
  const $carNameElement = $element(TAG.DIV, TAG.CLASS, CAR_ATTRIBUTE.CAR_NAME);
  $child($carNameElement, $carName);

  const $carElement = $element(TAG.DIV, TAG.ID, CAR_ATTRIBUTE.CAR);
  $child($carElement, $carNameElement);
  return $carElement;
};

export const carForwardTemplate = () => {
  const $forward = $text("⬇️");
  const $forwardContainer = $element(TAG.DIV, TAG.CLASS, CAR_ATTRIBUTE.CAR_FORWARD);
  $child($forwardContainer, $forward);

  return $forwardContainer;
}

export const carDelayTemplate = () => {
  const $delay = $element(TAG.SPAN, TAG.CLASS, CAR_ATTRIBUTE.CAR_DELAY);
  const $delayContainer = $element(TAG.DIV, TAG.CLASS, CAR_ATTRIBUTE.CAR_DELAY_CONTAINER);
  $child($delayContainer, $delay);

  const $delayDiv = $element(TAG.DIV, TAG.CLASS, CAR_ATTRIBUTE.CAR_DELAY_DIV);
  $delayDiv.setAttribute(TAG.ID, CAR_ATTRIBUTE.CAR_DELAY_ID);
  $child($delayDiv, $delayContainer);
  
  return $delayDiv;
}

export const deleteDelay = () => {
  let $delyDiv = $all(ID + CAR_ATTRIBUTE.CAR_DELAY_ID);
  console.log($delyDiv);
  $delyDiv && $delyDiv.forEach(elem => elem.remove());
  console.log($delyDiv);
}