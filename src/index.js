import {Controller} from './domain/controller/Controller';
import {queryValidInput} from './view/queryValidInput';
import {validateCarNames} from './domain/validateCarNames';
import {validateTotalRacingCount} from './domain/validateTotalRacingCount';

const startGame = (carNames, totalRacingCount) => {
  const controller = new Controller();
  controller.createCars(carNames);

  while (controller.currentRaceNumber < totalRacingCount) {
    controller.race();
    const currentRacingInfo = controller.getCarsDistance();
    console.log(currentRacingInfo.map(car => `${car.carName} : ${'-'.repeat(car.distance)}`).join('\n'), '\n');
  }

  const racingResult = controller.getCarsDistance();
  const winners = controller.getMaximumDistanceCars(racingResult);
  console.log(`${winners.map(winner => winner.carName).join(', ')}가 최종 우승했습니다.`);
};

const main = async () => {
  const carNameInput = await queryValidInput(
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
    validateCarNames,
  );
  const totalRacingCountInput = await queryValidInput('시도할 회수는 몇회인가요?\n', validateTotalRacingCount);

  const carNames = carNameInput.split(',').map(carName => carName.trim());
  const totalRacingCount = Number(totalRacingCountInput);

  startGame(carNames, totalRacingCount);
};

main();
