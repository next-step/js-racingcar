import { numbers } from "../utils/constant.js";

export function RacingCar() {
  let forward = numbers['INIT_NUM'];

  this.getForward = () => forward;
  this.move = movable => movable ? forward++ : false;
}

export function RacingCars(number) {
  const carNum = number;
  const cars = [];
  for (var i = 0; i < carNum; i++) cars.push(new RacingCar());
  
  this.move = (tryNum, movable) => {
    for (var i = 0; i < tryNum; i++) cars.forEach(car => car.move(movable));
  }

  this.getForwards = () => cars.map(car => car.getForward());

}