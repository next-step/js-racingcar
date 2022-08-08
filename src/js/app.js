import { NOTICE_MESSAGES } from './consts.js';
import racingData from './modules/RacingData.js';
import RacingModule from './modules/RacingModule.js';
import RacingViewModule from './modules/RacingViewModule.js';

const raceApp = () => {
  const $racingInfoForm = document.querySelector('#racing-info-form');
  const $carNames = {
    field: $racingInfoForm.querySelector('#car-names-field'),
    input: $racingInfoForm.querySelector('[name=car_names_input]'),
    btn: $racingInfoForm.querySelector('#car-names-btn'),
  };
  const $goalPositionNumber = {
    field: $racingInfoForm.querySelector('#goal-position-field'),
    input: $racingInfoForm.querySelector('[name=goal_position_number_input]'),
    btn: $racingInfoForm.querySelector('#goal-position-number-btn'),
  };

  const $raceStatusDiv = document.querySelector('#race-status-div');
  const $raceWinnerDiv = document.querySelector('#race-winner-div');
  const $raceWinner = {
    label: $raceWinnerDiv.querySelector('h2'),
    btn: $raceWinnerDiv.querySelector('#init-btn'),
  };

  const { getCarNames, hasTooLongName, moveRandom, getResultTryOnce, goRace } =
    RacingModule();

  const {
    initializeView,
    readyForNextStep,
    renderRaceStatus,
    hiddenSpinner,
    renderWinners,
  } = RacingViewModule();

  const onInitialize = () => {
    racingData.initialize();

    initializeView({
      value: [$carNames.input, $goalPositionNumber.input],
      innerHTML: [$raceStatusDiv, $raceWinner.label],
      hidden: [$goalPositionNumber.field, $raceStatusDiv, $raceWinnerDiv],
      disabled: [$carNames.field, $goalPositionNumber.field],
      classList: [$raceStatusDiv],
    });
  };

  const onTypingCarName = (e) => {
    if (e.key === 'Enter') {
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

      racingData.setRaceReadyStatus(namesArray);

      readyForNextStep(
        $carNames.field,
        $goalPositionNumber.field,
        $goalPositionNumber.input
      );
    } catch (e) {
      alert(e.message);
    }
  };

  const onStartRacing = async (e) => {
    e.preventDefault();
    racingData.setGoalPosition(+e.target.goal_position_number_input.value);

    readyForNextStep($goalPositionNumber.field, $raceStatusDiv);

    const winners = await goRace(racingData, (data) => {
      const result = getResultTryOnce(data, moveRandom);
      renderRaceStatus($raceStatusDiv, result);
      return result;
    });

    hiddenSpinner($raceStatusDiv);
    renderWinners($raceWinnerDiv, $raceWinner.label, winners);
  };

  $carNames.input.addEventListener('keydown', onTypingCarName);
  $carNames.btn.addEventListener('click', onCompleteCarNames);
  $racingInfoForm.addEventListener('submit', onStartRacing);
  $raceWinner.btn.addEventListener('click', onInitialize);
};

export default raceApp;
