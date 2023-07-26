import {Controller} from './controller/Controller';

export function main() {
  const controller = new Controller();
  const MAXIMUM_RACING_NUMBER = 5;

  while (controller.currentRaceNumber < MAXIMUM_RACING_NUMBER) {
    controller.race();
  }
}
