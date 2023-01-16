import RacingCar from '../application/RacingCar.js';
import registerCar from './registerCar.js';

export default function getFullRacingRecord(carName, count) {
  const cars = registerCar(carName);
  const racingCars = new RacingCar(cars);
  const records = [];

  for(let i = 0; i < Number(count); i++) {
    records.push(racingCars.race());
  }

  return records;
};