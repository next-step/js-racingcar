import { input, closeReadLine } from '../utils/console';

export default class CarRaceView {
  async inputCarName() {
    return await input(
      '경주할 자동차 이름을 입력하세요(이름은 쉽표(,)를 기준으로 구분).\n'
    );
  }

  async inputRaceLapCount() {
    return await input('시도할 회수는 몇회인가요?\n');
  }

  closeInput() {
    closeReadLine();
  }

  printMessage(message) {
    console.log(message);
  }

  printLapResult(cars) {
    for (const car of cars) {
      const name = car.name;
      const distance = car.distance;

      console.log(`${name} : ${'-'.repeat(distance)}`);
    }
  }

  printWinners(winnerNames) {
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  }
}
