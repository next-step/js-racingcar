import readLineAsync from './readLineAsync.js';
import Car from './car.js';
import Race from './race.js';

async function main() {
  const name = await readLineAsync('자동차 이름을 입력하세요. \n');

  const cars = name.split(',').map((car) => new Car(car));
  const count = await readLineAsync('시도할 회수는 몇회인가요? \n');

  const race = new Race(cars, count);
  console.log('실행 결과');
  race.startRace();
  race.getTrajectory().forEach(({ trajectory }) => {
    trajectory.forEach((car) => {
      console.log(`${car.name} : ${'-'.repeat(car.location)}`);
    });
  });
  console.log(`${race.getWinner()}가 최종 우승했습니다.`);
}

main();
