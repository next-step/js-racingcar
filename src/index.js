import {splitByComma} from './utils/splitByComma';
import {isExistOverLengthText} from './utils/isExistOverLengthText';
import {isExistEmptyText} from './utils/isExistEmptyText';
import {Controller} from './controller/Controller';
import {printRacingInfo} from './view/printRacingInfo';
import {printWinners} from './view/printWinners';
import {queryLineInput} from './view/queryLineInput';
import {trimTexts} from './utils/trimTexts';
import {isPositiveInteger} from './utils/isPositiveInteger';

const MAXIMUM_CAR_NAME_LENGTH = 5;

const startGame = (carNames, racingNumber) => {
  const controller = new Controller();
  controller.createCars(carNames);

  while (controller.currentRaceNumber < racingNumber) {
    controller.race();
    const currentRacingInfo = controller.getCarsDistance();
    printRacingInfo(currentRacingInfo);
  }

  const racingResult = controller.getCarsDistance();
  const winners = controller.getMaximumDistanceCars(racingResult);
  printWinners(winners.map(winner => winner.carName));
};

const inputRacingNumber = carNames => {
  queryLineInput({
    queryText: '시도할 회수는 몇회인가요?\n',
    onLineInput: line => {
      const racingNumber = Number(line);
      if (!isPositiveInteger(racingNumber)) {
        console.log('양의 정수를 입력해주세요.\n');
        inputRacingNumber(carNames);
        return;
      }

      startGame(carNames, racingNumber);
    },
  });
};

const inputCarNames = () => {
  queryLineInput({
    queryText: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
    onLineInput: line => {
      const carNames = trimTexts(splitByComma(line));

      if (!isExistOverLengthText(carNames, MAXIMUM_CAR_NAME_LENGTH)) {
        console.log('자동차 이름은 5자 이하로 입력해주세요.\n');
        inputCarNames();
        return;
      }

      if (isExistEmptyText(carNames)) {
        console.log('자동차 이름은 공백이 될 수 없습니다.\n');
        inputCarNames();
        return;
      }

      inputRacingNumber(carNames);
    },
  });
};

function main() {
  inputCarNames();
}

main();
