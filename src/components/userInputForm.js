import { $ } from '../utils/dom.js';
import { validateCarNames } from '../validation.js';

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

  this.$carNameSubmitButton.addEventListener('click', this.handleSubmitCarNames);
  this.$carNameInput.addEventListener('keyup', this.handleCarNameInput);
}
