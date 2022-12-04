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
  showResult() {
    let temp = `<div class="mt-4 d-flex">`;
    const forwardIconElement = document.createElement('div');
    forwardIconElement.setAttribute('class', 'forward-icon mt-2');
    forwardIconElement.append('⬇️️');

    const stopIconElement = document.createElement('div');
    stopIconElement.setAttribute('class', 'd-flex justify-center mt-3 stop-icon-element');

    const stopIconElementInner = document.createElement('div');
    stopIconElementInner.setAttribute('class', 'relative spinner-container');

    const stopIconElementSpan = document.createElement('span');
    stopIconElementSpan.setAttribute('class', 'material spinner');
    // console.log(stopIconElement, stopIconElementInner);

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
    document.querySelector('.car-player-wrap').appendChild(stopIconElement);

    document.querySelector('.stop-icon-element').appendChild(stopIconElementInner);
    document.querySelector('.spinner-container').appendChild(stopIconElementSpan);
    console.log(forwardIconElement, stopIconElement);
  },

  //   showForwardIcon() {
  //     const forwardIconElement = document.createElement('div');
  //     forwardIconElement.setAttribute('class', 'forward-icon mt-2');
  //     forwardIconElement.append('⬇️️');
  //     return forwardIconElement;
  //   },
};

export default racingAdmin;
