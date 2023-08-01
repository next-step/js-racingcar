import {Controller} from './controller/Controller';
import {queryCarNames} from './view/queryCarNames';
import {printRacingInfo} from './view/printRacingInfo';
import {printWinners} from './view/printWinners';
import {queryRacingNumber} from './view/queryRacingNumber';

export const MAXIMUM_CAR_NAME_LENGTH = 5;

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

function main() {
  const onInputCarNames = carNames => {
    queryRacingNumber(racingNumber => startGame(carNames, racingNumber));
  };

  queryCarNames(onInputCarNames);
}

main();
