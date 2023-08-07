import { Car, CarRaceOrganizer } from './classes/index';

const startGame = (inputCars, inputTotalLap) => {
  const cars = inputCars.map((car) => new Car(car));
  const carRaceOrganizer = new CarRaceOrganizer(cars, inputTotalLap);
  carRaceOrganizer.runFullRace();
};

export default startGame;
