import { Car, CarRace } from './classes/index';

const startGame = (inputCars) => {
  const cars = inputCars.map((car) => new Car(car));
  const carRace = new CarRace(cars);
  carRace.runFullRace();
};

export default startGame;
