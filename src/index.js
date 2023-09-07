import RacingCar from './domain/racing-car.js';
import UserIO from './view/user-io.js';
import { readline } from './utils/readline.util.js';

const userIO = new UserIO(readline);
const racingCar = new RacingCar();

const startRacing = async () => {
  let carNames = [];

  const names = await userIO.inputCarNames();

  if (!racingCar.validateCarNamesInput(names)) {
    userIO.outputWrongInput();
    return startRacing();
  }

  carNames = names;

  const count = await userIO.inputCount();

  if (!racingCar.validateCountInput(count)) {
    userIO.outputWrongInput();
    return startRacing();
  }

  racingCar.setCount(count);

  userIO.outputTitle();

  racingCar.setRacers(carNames);

  racingCar.race(racingCar.racers);

  userIO.outputWinnerNames(racingCar.getWinnerNames());

  userIO.close();
};

startRacing();
