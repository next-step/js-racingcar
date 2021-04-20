import { numbers } from "../utils/constant.js";

export function RacingCar(inputName) {
  const name = inputName;
  let forward = numbers['INIT_NUM'];

  this.status = () => [name, forward];
  this.getName = () => name;
  this.getForward = () => forward;
  this.move = movable => movable ? forward++ : false;
  this.isMovableTime = time => forward >= time;
}

export function RacingCars() {
  const cars = [];
  
  this.setNames = inputNames => {
    inputNames.forEach(name => cars.push(new RacingCar(name)));
  };
  
  this.move = (tryNum, movable) => {
    for (var i = 0; i < tryNum; i++) cars.forEach(car => car.move(movable));
  }

  this.getCarsStatus = () => cars.map(car => car.status());
  this.getForward = () => cars.map(car => car.getForward());
  this.getNames = () => cars.map(car => car.getName());
  this.areMovableTime = time => cars.map(car => car.isMovableTime(time));
}

export const carTemplate = name => {
  const carName = document.createTextNode(name);
  const carNameElement = document.createElement("div");
  carNameElement.setAttribute("class", "car-player mr-2");
  carNameElement.appendChild(carName);

  const carElement = document.createElement("div");
  carElement.setAttribute("id", "car");
  carElement.appendChild(carNameElement);
  return carElement;
};

export const carForwardTemplate = () => {
  const forward = document.createTextNode("⬇️");

  const element = document.createElement("div");
  element.setAttribute("class", "forward-icon mt-2");
  element.appendChild(forward);
  return element;
}
