import readLineAsync from './readLineAsync.js';
import Car from './car.js';
import Race from './race.js';

async function main() {
  const name = await readLineAsync('자동차 이름을 입력하세요. \n');

  const cars = name.split(',').map((car) => new Car(car));
  const race = new Race(cars);
  console.log('실행 결과');
  race.startRace();
  console.log('경주를 완료했습니다.');
}

main();
