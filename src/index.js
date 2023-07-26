import {Controller} from './controller/Controller';
import {printRacingInfo} from './view/printRacingInfo';
import {printWinners} from './view/printWinners';
import {getLineInput} from './view/getLineInput';

const splitByComma = text => {
  return text.split(',').map(word => word.trim());
};

const startGame = carNames => {
  const MAXIMUM_RACING_NUMBER = 5;

  const controller = new Controller();
  controller.createCars(carNames);

  console.log('실행 결과');

  while (controller.currentRaceNumber < MAXIMUM_RACING_NUMBER) {
    controller.race();
    const currentRacingInfo = controller.getCarsDistance();
    printRacingInfo(currentRacingInfo);
  }

  const racingResult = controller.getCarsDistance();
  const winners = controller.getMaximumDistanceCars(racingResult);
  printWinners(winners.map(winner => winner.carName));
};

function main() {
  const controller = new Controller();

  console.log('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).');

  getLineInput(input => {
    const carNames = splitByComma(input);
    if (!controller.isValidCarNames(carNames)) {
      console.log('잘못된 입력 값입니다.');
      return;
    }

    startGame(carNames);
  });
}

main();
