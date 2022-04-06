import {
  SELECTORS,
  MESSAGES,
  CAR_NAME_DIVIDER,
  CAR_NAME_REGEXP,
  CAR_NAME_MAX_LENGTH,
  CAR_ADVANCE_CONDITION_NUMBER,
} from './constant.js';
import {
  templateRaceAdvance,
  templateRaceLapFieldset,
  templateRacePlayer,
  templateRaceTrack,
  templateRaceSpinner,
} from './template.js';
import racingCar from './racingcar.js';

const app = {
  [`$app`]: document.querySelector(SELECTORS.APP),
  [`$form`]: document.querySelector(SELECTORS.FORM),
  [`$carNamesInput`]: document.querySelector(SELECTORS.CAR_NAME_INPUT),
  [`$carNamesSubmitButton`]: document.querySelector(SELECTORS.CAR_NAME_SUBMIT_BUTTON),
  [`$raceLapInput`]: undefined,
  [`$raceLapSubmitButton`]: undefined,
  [`$raceTrack`]: undefined,

  racingCar,

  initialize() {
    this.$carNamesSubmitButton.addEventListener('click', this.submitCarNamesForm.bind(this));
  },

  validateCarNames() {
    const value = this.$carNamesInput.value.trim();
    const carNames = value.split(CAR_NAME_DIVIDER);
    const isCarNamesUnMatchRegExp = !CAR_NAME_REGEXP.test(value);
    const isCarNameMaxLengthOver = carNames.find((carName) => carName.trim().length > CAR_NAME_MAX_LENGTH);

    if (!value) {
      alert(MESSAGES.CAR_NAME_EMPTY);
      return false;
    }

    if (isCarNamesUnMatchRegExp) {
      alert(MESSAGES.CAR_NAME_NOT_MATCH_REGEXP);
      return false;
    }

    if (isCarNameMaxLengthOver) {
      alert(MESSAGES.CAR_NAME_LENGTH_OVER);
      return false;
    }

    return true;
  },

  disableCarNamesForm() {
    this.$carNamesInput.setAttribute('disabled', true);
    this.$carNamesSubmitButton.setAttribute('disabled', true);
  },

  submitCarNamesForm() {
    const value = this.$carNamesInput.value.trim();
    const carNames = value.split(CAR_NAME_DIVIDER);

    if (!this.validateCarNames()) return;
    this.disableCarNamesForm();
    this.renderRaceLapForm();
    carNames.forEach(this.racingCar.addCar);
  },

  validateRaceLap() {
    const value = this.$raceLapInput.value.trim();

    if (!value) {
      alert(MESSAGES.RACE_LAP_EMPTY);
      return false;
    }

    return true;
  },

  disableRaceLapForm() {
    this.$raceLapInput.setAttribute('disabled', true);
    this.$raceLapSubmitButton.setAttribute('disabled', true);
  },

  submitRaceLapForm() {
    const value = this.$raceLapInput.value.trim();

    if (!this.validateRaceLap()) return;
    this.disableRaceLapForm();
    this.racingCar.setLap(value);
    this.renderRaceTrack();
    this.racingCar.getCars().forEach(this.renderRacePlayer.bind(this));
    this.racing();
  },

  renderRaceLapForm() {
    this.$form.insertAdjacentHTML('beforeend', templateRaceLapFieldset());
    this.$raceLapInput = document.querySelector(SELECTORS.RACE_LAP_INPUT);
    this.$raceLapSubmitButton = document.querySelector(SELECTORS.RACE_LAP_SUBMIT_BUTTON);
    this.$raceLapSubmitButton.addEventListener('click', this.submitRaceLapForm.bind(this));
  },

  renderRaceTrack() {
    this.$app.insertAdjacentHTML('beforeend', templateRaceTrack());
    this.$raceTrack = document.querySelector(SELECTORS.RACE_TRACK);
  },

  renderRacePlayer({ name }) {
    this.$raceTrack.insertAdjacentHTML('beforeend', templateRacePlayer(name));
  },

  renderRacing({ name, data }) {
    const $player = document.querySelector(`[data-player=${name}]`);
    const $spinner = $player.querySelector(SELECTORS.SPINNER);
    const isAdvanceCondition = data > CAR_ADVANCE_CONDITION_NUMBER;
    const isNotHasSpinner = !$spinner;

    if (isAdvanceCondition) {
      $spinner?.remove();
      $player.insertAdjacentHTML('beforeend', templateRaceAdvance());
    } else if (isNotHasSpinner) {
      $player.insertAdjacentHTML('beforeend', templateRaceSpinner());
    }
  },

  racing() {
    this.racingCar.racing().forEach(this.renderRacing);

    const findRacingFinishedPlayer = ({ data }) => {
      return data.filter((number) => number > CAR_ADVANCE_CONDITION_NUMBER).length >= this.racingCar.getLap();
    };
    const isRacingFinished = this.racingCar.getCars().findIndex(findRacingFinishedPlayer) > -1;

    if (!isRacingFinished) this.racing();
  },
};

export default app;
