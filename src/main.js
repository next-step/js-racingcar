import { readLineAsync } from './readline-utils.js';
import Race from './race.js';

async function play() {
  const name = await readLineAsync('경주할 자동차 이름을 입력하세요.\n');
  const race = new Race(name);

  console.log('\n실행 결과');

  for (let i = 0; i < Race.RACE_ROUNDS; i++) {
    const results = race.proceed();

    results.forEach((car, index) => {
      const isLastCar = index === results.length - 1;
      const result = `${car.name} : ${'-'.repeat(car.location)}`;

      console.log(`${result}${isLastCar ? '\n' : ''}`);
    });
  }

  console.log('경주를 완료했습니다.');
}

play();
