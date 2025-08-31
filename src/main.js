import RacingGame from './RacingGame.js';
import readLineAsync from './readLineAsync.js';

// 입출력 예시
async function play() {
  try {
    const name = await readLineAsync('경주할 자동차 이름을 입력하세요: ');
    const racingCar = new RacingGame(name);

    racingCar.startGame();
  } catch (error) {
    console.log(error);
  }
}
play();
