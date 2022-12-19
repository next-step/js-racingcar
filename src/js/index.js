import {
  onSubmitCarNames,
  onSubmitTryNum,
  onStartRacingGame,
} from "./eventhandler.js";

const $submitCarNamesButtonSelector = "#submit-car-names";
const $submitTryNumBUttonSelector = "#submit-trynum";
const $racingCarGame = "#racing-car-game";

document
  .querySelector($submitCarNamesButtonSelector)
  .addEventListener("click", onSubmitCarNames);

document
  .querySelector($submitTryNumBUttonSelector)
  .addEventListener("click", onSubmitTryNum);

document
  .querySelector($racingCarGame)
  .addEventListener("submitted", onStartRacingGame);
