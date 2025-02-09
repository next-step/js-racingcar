import Input from "./Input.js";
import Car from "./domain/Car.js";
import Race from "./domain/Race.js";

async function main() {
  const input = new Input();
  const cars = await input.askCarNames();
  const carList = cars.map((car) => new Car(car));
  const race = new Race(carList);
  race.moveCars(carList);
}

main();
