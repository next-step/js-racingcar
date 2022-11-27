import { Car } from '../service/Car.js';
import { RacingGame } from '../service/RacingGame.js';
import { ELEMENT } from './element.js';
import { removeClass } from './function.js';
import { selector } from './selector.js';
import { getAttemtTimesInput, getCarNamesFromInput, validateAttemptTimes, validateCarNames } from './validator.js';

export const handleCarNames = () => {
  try {
    validateCarNames();
    removeClass(selector(ELEMENT.FIELD.ATTEMPT_TIMES), 'hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const handleAttemptTimes = () => {
  try {
    validateAttemptTimes();
    removeClass(selector(ELEMENT.SECTION.CAR_RACING), 'hidden');
    // 도메인 영역으로 분리시킬 필요가 있다
    const cars = getCarNamesFromInput().map((carName) => new Car(carName));
    const attemptTimes = getAttemtTimesInput();
    const carRacing = new RacingGame(cars, attemptTimes);
    const winner = carRacing.run(cars, attemptTimes);
    console.log(winner);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
