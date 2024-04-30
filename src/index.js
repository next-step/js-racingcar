import Car from './domain/Car.js';
import Race from './domain/Race.js';
import { parseInput } from './utils/input.js';
import { readLineAsync } from './utils/readLineAsync.js';

async function play() {
  // Input
  const input = await readLineAsync('자동차 이름을 입력하세요 > ');
  const carNames = parseInput(input);

  // Domain Objects
  const cars = carNames.map(carName => new Car(carName));
  const race = new Race(cars);

  // 경주 시작
  race.initRace();
}

await play();
