import Car from '../domain/car.js';
import Race from '../domain/race.js';
import ReadLineInput from './readLineInput.js';
import Output from './output.js';

async function main() {
  const readLineInput = new ReadLineInput();
  const output = new Output();

  const name = await readLineInput.askCarNames();
  const cars = name.split(',').map((car) => new Car(car));

  const count = await readLineInput.askRound();
  const race = new Race(cars, count);
  race.startRace();

  output.printResultText();
  output.printTrajectory(race.getTrajectory());
  console.log(output.printFinalWinner(race.getWinner()));
}

main();
