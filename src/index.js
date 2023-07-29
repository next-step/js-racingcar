import {splitByComma} from './utils/splitByComma';
import {isExistOverLengthText} from './utils/isExistOverLengthText';
import {isExistEmptyText} from './utils/isExistEmptyText';
import {Controller} from './controller/Controller';
import {printRacingInfo} from './view/printRacingInfo';
import {printWinners} from './view/printWinners';
import {getLineInput} from './view/getLineInput';
import {trimTexts} from './utils/trimTexts';

const MAXIMUM_RACING_NUMBER = 5;
const MAXIMUM_CAR_NAME_LENGTH = 5;

const startGame = carNames => {
  const controller = new Controller();
  controller.createCars(carNames);

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
  console.log('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).');

  getLineInput(input => {
    const carNames = trimTexts(splitByComma(input));
    if (!isExistOverLengthText(carNames, MAXIMUM_CAR_NAME_LENGTH)) {
      console.log('자동차 이름은 5자 이하로 입력해주세요.');
      return;
    }

    if (isExistEmptyText(carNames)) {
      console.log('자동차 이름은 공백이 될 수 없습니다.');
      return;
    }

    startGame(carNames);
  });
}

main();
