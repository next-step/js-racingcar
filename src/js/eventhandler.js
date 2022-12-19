import RacingCarGame from "./RacingCarGame.js";
import RacingCar from "./model/RacingCar.js";
import { ERROR_MESSAGES } from "./constants.js";
import { isValidCarNames } from "./utils/validation.js";
import {
  setCarReady,
  showWaitingStatus,
  moveOrStopCars,
  diableFieldSet,
} from "./view/racingCarView.js";
import { playOneRacingGame } from "./service/racingCarGameService.js";

const $inputCarNamesSelector = "input[name='car-names']";
const $inputTryNumSelector = "input[name='trynum']";
const $fieldSetCarNameSelector = "#car-names-fieldset";
const $fieldSetTryNumSelector = "#trynum-fieldset";
const $racingCarGame = "#racing-car-game";

const onSubmitCarNames = () => {
  const carNamesStr = document.querySelector($inputCarNamesSelector).value;
  if (!carNamesStr) throw new Error(ERROR_MESSAGES.INVALID_INPUT);
  const carNames = carNamesStr.split(",");

  try {
    if (isValidCarNames(carNames)) {
      diableFieldSet($fieldSetCarNameSelector);

      RacingCarGame.CarCnt = carNames.length;
      RacingCarGame.Cars = carNames;
    }
  } catch (e) {
    alert(e);
  }
};

const onSubmitTryNum = () => {
  const tryNum = document.querySelector($inputTryNumSelector).value;
  if (!tryNum) throw new Error(ERROR_MESSAGES.INVALID_INPUT);

  RacingCarGame.TryNum = tryNum;
  diableFieldSet($fieldSetTryNumSelector);

  const formSubmitted = new CustomEvent("submitted");
  document.querySelector($racingCarGame).dispatchEvent(formSubmitted);
};

const onStartRacingGame = () => {
  const racingCars = RacingCarGame.Cars.map((car) => new RacingCar(car));
  setCarReady(racingCars);
  showWaitingStatus(racingCars);

  [...Array(RacingCarGame.TryNum).keys()].reduce((prevPromise, cur, idx) => {
    return playOneRacingGame(racingCars).then((responses) => {
      moveOrStopCars(racingCars, responses);

      if (idx < RacingCarGame.TryNum - 1) {
        showWaitingStatus(racingCars);
      }
    });
  }, Promise.resolve());
};

export { onSubmitCarNames, onSubmitTryNum, onStartRacingGame };
