import { ERROR_WRONG_INPUT_MESSAGE } from './constants/error.const.js';
import RacingCar from './domain/racing-car.js';
import { readline } from './utils/readline.util.js';
import UserIO from './view/user-io.js';

const userIO = new UserIO(readline);
const racingCar = new RacingCar();

const getCarNames = async () => {
  const carNames = await userIO.inputCarNames();

  if (!racingCar.validateCarNamesInput(carNames)) {
    userIO.outputWrongInput();
    throw new Error(ERROR_WRONG_INPUT_MESSAGE);
  }

  return carNames;
};

const getCount = async () => {
  const count = await userIO.inputCount();

  if (!racingCar.validateCountInput(count)) {
    userIO.outputWrongInput();
    throw new Error(ERROR_WRONG_INPUT_MESSAGE);
  }

  return count;
};

const race = (carNames, count) => {
  racingCar.setCount(count);

  userIO.outputTitle();

  racingCar.setRacers(carNames);

  racingCar.race({
    onSingleRoundDone: () => userIO.outputEmpty(),
    onRacerMove: (racer) => userIO.outputRacingState(racer),
  });

  userIO.outputWinnerNames(racingCar.getWinnerNames());
};

const close = () => {
  userIO.close();
};

const startRacing = async () => {
  try {
    const carNames = await getCarNames();
    const count = await getCount();

    race(carNames, count);
    close();
  } catch (error) {
    startRacing();
  }
};

startRacing();
