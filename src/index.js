import Car from './domain/car';
import CarRace from './domain/carRace';
import CarRaceView from './view';

const carRaceView = new CarRaceView();
const carRace = new CarRace([
  new Car('pobi'),
  new Car('crong'),
  new Car('honux'),
]);

carRaceView.welcome();
carRaceView.printMessage(carRace.participantNames);
carRace.start();
carRaceView.printWinners(carRace.winnerNames);
