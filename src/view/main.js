import Car from '../domain/car.js';
import Race from '../domain/race.js';
import ReadLineInput from './readLineInput.js';
import Output from './output.js';

async function main() {
  const readLineInput = new ReadLineInput();
  const output = new Output();

  const name = await readLineInput.askCarNames('자동차 이름을 입력하세요. \n');
  const cars = name.split(',').map((car) => new Car(car));

  const count = await readLineInput.askRound('시도할 회수는 몇회인가요? \n');
  const race = new Race(cars, count);
  race.startRace();

  output.printResultText();
  output.trajectory(race.getTrajectory());
  console.log(output.printFinalWinner(race.getWinner()));
}

main();
