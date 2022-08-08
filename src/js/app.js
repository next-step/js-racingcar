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

  const { addRaceStepEvent } = RacingViewModule(
    $racingInfoForm,
    $carNames,
    $goalPositionNumber,
    $raceStatusDiv,
    $raceWinnerDiv,
    $raceWinner
  );

  addRaceStepEvent();
};

export default raceApp;
