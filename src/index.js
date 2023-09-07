import RacingCar from './domain/racing-car.js';
import UserIO from './view/user-io.js';
import { readline } from './utils/readline.util.js';

const userIO = new UserIO(readline);
const racingCar = new RacingCar();

const startRacing = async () => {
  let carNames = [];

  await userIO.inputCarNames().then((names) => {
    if (!racingCar.validateCarNamesInput(names)) {
      userIO.outputWrongInput();
      return startRacing();
    }

    carNames = names;
  });

  await userIO.inputCount().then((count) => {
    if (!racingCar.validateCountInput(count)) {
      userIO.outputWrongInput();
      return startRacing();
    }

    racingCar.setCount(count);

    userIO.outputTitle();

    racingCar.setRacers(carNames);

    racingCar.race(racingCar.racers);

    userIO.outputRacingStates(racingCar.getRacers(), racingCar.count);

    userIO.outputWinnerNames(racingCar.getWinnerNames());

    userIO.close();
  });
};

startRacing();
