import {Controller} from './controller/Controller';
import {printRacingInfo} from './view/printRacingInfo';
import {printWinners} from './view/printWinners';

export function main() {
  const controller = new Controller();
  const MAXIMUM_RACING_NUMBER = 5;

  console.log('실행 결과');
  while (controller.currentRaceNumber < MAXIMUM_RACING_NUMBER) {
    controller.race();
    const currentRacingInfo = controller.getCarsDistance();
    printRacingInfo(currentRacingInfo);
  }

  const racingResult = controller.getCarsDistance();
  const winners = controller.getMaximumDistanceCars(racingResult);
  printWinners(winners);
}
