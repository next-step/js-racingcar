import { carNameEl, loadingEl, racingLineEl } from './element.js';
import { $racingCarInner } from '../selector.js';

export const showContent = ($el) => {
  $el.classList.add('active');
};

export const hideContent = ($el) => {
  $el.classList.remove('active');
};

export const appendRacingEl = (resultOfOneCycle) => {
  console.log(resultOfOneCycle);
};

export const prepareRacingArea = (carNameList) => {
  const racingLines = carNameList.reduce((fragment, carName) => {
    const racingLine = racingLineEl();
    racingLine.append(carNameEl(carName), loadingEl());
    fragment.appendChild(racingLine);
    return fragment;
  }, document.createDocumentFragment());

  $racingCarInner.replaceChildren(racingLines);
};
