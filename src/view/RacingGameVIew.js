import { input } from '../utils/console';

export class RacingGameView {
  getCarNames = async () => {
    return await input(
      '경주할 자동차 이름을 입력하세요(이름은 쉽표(,)를 기준으로 구분).\n'
    );
  };

  getLapCount = async () => {
    return await input('시도할 회수는 몇회인가요?\n');
  };

  printRaceResult = async (racingGame) => {
    this.print('실행결과');
    this.print(racingGame.participantNames);
    this.print(racingGame.raceResult);
    this.print(`${racingGame.winnerNames}가 최종 우승했습니다.`);
  };

  print(message) {
    console.log(message);
  }

  printError(error) {
    console.error(error);
  }
}
