import { BOUNDARY, NUMBERS } from "../utils/constant.js";
import { TAG, CAR_ATTRIBUTE } from "../utils/selector.js";

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
  const carName = document.createTextNode(name);
  const carNameElement = document.createElement(TAG.DIV);
  carNameElement.setAttribute(TAG.CLASS, CAR_ATTRIBUTE.CAR_NAME);
  carNameElement.appendChild(carName);

  const carElement = document.createElement(TAG.DIV);
  carElement.setAttribute(TAG.ID, CAR_ATTRIBUTE.CAR);
  carElement.appendChild(carNameElement);
  return carElement;
};

export const carForwardTemplate = () => {
  const forward = document.createTextNode("⬇️");

  const element = document.createElement(TAG.DIV);
  element.setAttribute(TAG.CLASS, CAR_ATTRIBUTE.CAR_FORWARD);
  element.appendChild(forward);
  return element;
}
