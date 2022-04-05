import { $ } from '../utils/dom.js';
import { validateCarNames, validateRaceTimes } from '../validation.js';
import { MIN_CARS_NUMBER, MIN_RACE_TIMES } from '../constants/validation.js';

export default function UserInputForm({ initState, setCars, setRaceTimes }) {
  this.$carNameInput = $('.input-car-name');
  this.$carNameSubmitButton = $('.submit-car-name');
  this.$raceTimesInputSection = $('.input-race-times-section');
  this.$raceTimesInput = $('.input-race-times');
  this.$raceTimesSubmitButton = $('.submit-race-times');

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { cars, raceTimes } = this.state;

    this.$carNameInput.disabled = cars.length >= MIN_CARS_NUMBER;
    this.$carNameSubmitButton.disabled = cars.length >= MIN_CARS_NUMBER;
    this.$raceTimesInputSection.classList.toggle('hidden', cars.length < MIN_CARS_NUMBER);
    if (cars.length >= MIN_CARS_NUMBER) {
      this.$raceTimesInput.focus();
    }
    this.$raceTimesInput.disabled = raceTimes >= MIN_RACE_TIMES;
    this.$raceTimesSubmitButton.disabled = raceTimes >= MIN_RACE_TIMES;
  };
  this.render();

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

  this.handleCarNameInput = (e) => {
    if (e.code === 'Enter') {
      this.handleSubmitCarNames();
    }
  };

  this.handleRaceTimesInput = (e) => {
    if (e.code === 'Enter') {
      this.handleSubmitRaceTimes();
    }
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

  this.$carNameInput.addEventListener('keyup', this.handleCarNameInput);
  this.$carNameSubmitButton.addEventListener('click', this.handleSubmitCarNames);
  this.$raceTimesInput.addEventListener('keyup', this.handleRaceTimesInput);
  this.$raceTimesSubmitButton.addEventListener('click', this.handleSubmitRaceTimes);
}
