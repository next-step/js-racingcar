import Car from './domain/car';
import CarRace from './domain/carRace';
import CarRaceView from './view';

const carRace = new CarRace([
  new Car('pobi'),
  new Car('crong'),
  new Car('honux'),
]);

carRace.start(new CarRaceView());
