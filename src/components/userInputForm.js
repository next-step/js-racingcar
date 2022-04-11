import { $ } from '../utils/dom.js';
import { validateCarNames, validateRaceTimes } from '../validation.js';
import { MIN_CARS_NUMBER, MIN_RACE_TIMES } from '../constants/validation.js';

export default function UserInputForm({ initState, setCars, setRaceTimes }) {
  this.$carNameForm = $('.car-name-form');
  this.$carNameFormField = $('.car-name-form-field');
  this.$carNameInput = $('.input-car-name');
  this.$raceTimesForm = $('.race-times-form');
  this.$raceTimesFormField = $('.race-times-form-field');
  this.$raceTimesInput = $('.input-race-times');

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.handleSubmitCarNames = () => {
    const carNames = this.$carNameInput.value.split(',').map((carName) => carName.trim());
    try {
      validateCarNames(carNames);
    } catch (error) {
      alert(error.message);
      return;
    }
    setCars(carNames);
  };

  this.handleSubmitRaceTimes = () => {
    const raceTimes = parseInt(this.$raceTimesInput.value, 10);
    try {
      validateRaceTimes(raceTimes);
    } catch (error) {
      alert(error.message);
      return;
    }
    setRaceTimes(raceTimes);
  };

  this.handleUserFormSubmit = (e) => {
    e.preventDefault();
    const $targetFormName = e.target.dataset?.formName;

    if ($targetFormName === 'carName') {
      this.handleSubmitCarNames();
      return;
    }

    this.handleSubmitRaceTimes();
  };

  this.isSubmittedRaceTimes = (raceTimes) => raceTimes >= MIN_RACE_TIMES;

  this.isSubmittedCarNames = (cars) => cars.length >= MIN_CARS_NUMBER;

  this.resetUserInputForms = () => {
    this.$carNameForm.reset();
    this.$raceTimesForm.reset();
  };

  this.isInitializedGame = (cars, raceTimes) => cars.length < MIN_CARS_NUMBER && raceTimes < MIN_RACE_TIMES;

  this.render = () => {
    const { cars, raceTimes } = this.state;

    if (this.isInitializedGame(cars, raceTimes)) this.resetUserInputForms();

    this.$carNameFormField.disabled = this.isSubmittedCarNames(cars);
    this.$raceTimesForm.classList.toggle('hidden', !this.isSubmittedCarNames(cars));
    if (this.isSubmittedCarNames(cars)) this.$raceTimesInput.focus();
    this.$raceTimesFormField.disabled = this.isSubmittedRaceTimes(raceTimes);
  };

  this.render();

  this.$carNameForm.addEventListener('submit', this.handleUserFormSubmit);
  this.$raceTimesForm.addEventListener('submit', this.handleUserFormSubmit);
}
