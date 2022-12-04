import { $carNameInput } from './utils/dom.js';

const racingAdmin = {
  names: [],
  count: 0,
  position: [],
  result: [],

  setCarName(newNames) {
    this.names = newNames;
  },
  setCount(newCount) {
    this.count = newCount;
  },
  // false, false, false, false
  setPosition(carNames) {
    this.position = new Array(carNames.length).fill(false).map(() => {
      const randomNumber = this.generateRandomNumber(0, 9);
      return this.moveCar(randomNumber);
    });
    console.log(this.position);
  },

  setResult() {
    // 차이름, 랜덤숫자배열
    this.result = [this.names, this.position];
  },

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  moveCar(randomNumber) {
    return randomNumber >= 4;
  },

  trimValue(value) {
    return value.split(' ').join('');
  },

  splitComma(value) {
    return value.split(',');
  },

  focusInput() {
    $carNameInput.focus();
  },

  showResult() {
    let temp = '';

    for (let i = 0; i < this.result[0].length; i++) {
      let str = '';
      if (this.result[1][i]) {
        for (let j = 0; j < this.result[1][i]; j++) {
          str += `<div class="forward-icon mt-2">⬇️️</div>`;
        }
      }
      str += `
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
            <span class="material spinner"></span>
        </div>
      </div>`;

      temp += `
              <div class="mr-2 car-player-wrap">
                  <div class="car-player">${this.result[0][i]}</div>
                  ${str}
              </div>
          `;
    }

    document.querySelector('#car-player-section').innerHTML = temp;
  },
};
export default racingAdmin;
