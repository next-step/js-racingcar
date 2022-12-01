import { $carNameInput } from './utils/dom.js';

const racingAdmin = {
  names: [],
  count: 0,
  result: [],

  setCarName(newName) {
    this.names = newName;
  },
  setCount(newCount) {
    this.count = newCount;
  },
  setResult(newResult) {
    this.result = newResult;
  },

  splitComma(value) {
    return value.split(',');
  },

  focusInput() {
    $carNameInput.focus();
  },

  showCarNames(carNames) {
    let temp = `<div class="mt-4 d-flex">`;
    carNames.forEach((element) => {
      temp += `
        <div class="mr-2">
            <div class="car-player">${element}</div>
          </div>
        `;
    });
    temp += `</div>`;
    document.querySelector('#car-player-section').innerHTML = temp;
  },
};

export default racingAdmin;
