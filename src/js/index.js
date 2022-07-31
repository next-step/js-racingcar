import { NOTICE_MESSAGES } from "./consts.js";
import racingData from "./modules/RacingData.js";
import RacingModule from "./modules/RacingModule.js";
import RacingViewModule from "./modules/RacingViewModule.js";

const $racingInfoForm = document.querySelector("#racing-info-form");
const $carNames = {
  field: $racingInfoForm.querySelector("#car-names-field"),
  input: $racingInfoForm.querySelector("[name=car_names_input]"),
  btn: $racingInfoForm.querySelector("#car-names-btn"),
};
const $tryNumber = {
  field: $racingInfoForm.querySelector("#try-field"),
  input: $racingInfoForm.querySelector("[name=try_number_input]"),
  btn: $racingInfoForm.querySelector("#try-number-btn"),
};

const $raceStatusDiv = document.querySelector("#race-status-div");
const $raceWinnerDiv = document.querySelector("#race-winner-div");
const $raceWinner = {
  label: $raceWinnerDiv.querySelector("h2"),
  btn: $raceWinnerDiv.querySelector("#init-btn"),
};

const { getCarNames, isBlink, hasTooLongName, getResultTryOnce, goRace } =
  RacingModule();
const {
  initializeView,
  readyForNextStep,
  renderRaceStatus,
  hiddenSpinner,
  renderWinners,
} = RacingViewModule();

const onInitialize = (e) => {
  racingData.initialize();

  initializeView({
    value: [$carNames.input, $tryNumber.input],
    innerHTML: [$raceStatusDiv, $raceWinner.label],
    hidden: [$tryNumber.field, $raceStatusDiv, $raceWinnerDiv],
    disabled: [$carNames.field, $tryNumber.field],
    classList: [$raceStatusDiv],
  });
};

const onTypingCarName = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    onCompleteCarNames();
  }
};

const onCompleteCarNames = () => {
  try {
    if (!$carNames.input.value) {
      throw new Error(NOTICE_MESSAGES.NAME.EMPTY);
    }
    const namesArray = getCarNames($carNames.input.value);

    if (hasTooLongName(namesArray)) {
      throw new Error(NOTICE_MESSAGES.NAME.MAX_LENGTH);
    }

    racingData.raceReadyStatus = namesArray;

    readyForNextStep($carNames.field, $tryNumber.field, $tryNumber.input);
  } catch (e) {
    alert(e.message);
  }
};

const onStartRacing = (e) => {
  e.preventDefault();
  racingData.setGoalTryNumber = +e.target.try_number_input.value;

  readyForNextStep($tryNumber.field, $raceStatusDiv);

  goRace(racingData, (data) => {
    const result = getResultTryOnce(data);
    renderRaceStatus($raceStatusDiv, result);
    return result;
  }).then((winners) => {
    hiddenSpinner($raceStatusDiv);
    renderWinners($raceWinnerDiv, $raceWinner.label, winners);
  });
};

$carNames.input.addEventListener("keydown", onTypingCarName);
$carNames.btn.addEventListener("click", onCompleteCarNames);
$racingInfoForm.addEventListener("submit", onStartRacing);
$raceWinner.btn.addEventListener("click", onInitialize);
