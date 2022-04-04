import { $ } from '../utils/dom.js';
import { validateCarNames, validateRaceTimes } from '../validation.js';

export default function UserInputForm({ initState, setCars }) {
  this.$carNameInput = $('.input-car-name');
  this.$carNameSubmitButton = $('.submit-car-name');
  this.$raceTimesInputSection = $('.input-race-times-section');
  this.$raceTimesInput = $('.input-race-times');
  this.$raceTimeSubmitButton = $('.submit-race-times');

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { cars } = this.state;

    this.$carNameInput.disabled = cars.length !== 0;
    this.$carNameSubmitButton.disabled = cars.length !== 0;
    this.$raceTimesInputSection.classList.toggle('hidden', cars.length === 0);
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

    console.log(raceTimes);
  };

  this.$carNameInput.addEventListener('keyup', this.handleCarNameInput);
  this.$carNameSubmitButton.addEventListener('click', this.handleSubmitCarNames);
  this.$raceTimesInput.addEventListener('keyup', this.handleRaceTimesInput);
  this.$raceTimeSubmitButton.addEventListener('click', this.handleSubmitRaceTimes);
}
