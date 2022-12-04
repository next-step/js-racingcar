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

  trimValue(value) {
    return value.split(' ').join('');
  },

  splitComma(value) {
    return value.split(',');
  },

  focusInput() {
    $carNameInput.focus();
  },
  showCarName() {
    let temp = `<div class="mt-4 d-flex">`;
    const forwardIconElement = document.createElement('div');
    forwardIconElement.setAttribute('class', 'forward-icon mt-2');
    forwardIconElement.append('⬇️️');

    this.names.forEach((element) => {
      temp += `
        <div class="mr-2 car-player-wrap">
            <div class="car-player">${element}</div>
          </div>
        `;
    });
    temp += `</div>`;
    document.querySelector('#car-player-section').innerHTML = temp;
    document.querySelector('.car-player-wrap').appendChild(forwardIconElement);
    console.log(forwardIconElement);
    console.log(document.querySelector('#car-player-section'));
  },

  //   showForwardIcon() {
  //     const forwardIconElement = document.createElement('div');
  //     forwardIconElement.setAttribute('class', 'forward-icon mt-2');
  //     forwardIconElement.append('⬇️️');
  //     return forwardIconElement;
  //   },
};

export default racingAdmin;
