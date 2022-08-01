import { carNameEl, downArrowEl, loadingEl, racingLineEl } from './element.js';
import { $racingCar, $racingCarInner } from '../selector.js';

export const showContent = ($el) => {
  $el.classList.add('active');
};

export const hideContent = ($el) => {
  $el.classList.remove('active');
};

export const setDisabledForm = ($form) => {
  $form.querySelector('fieldset').setAttribute('disabled', 'disabled');
};

export const appendRacingEl = (resultOfOneCycle) => {
  const $previousEl = document
    .querySelector('#car-racing-inner')
    .cloneNode(true);

  const racingLines = Array.from($previousEl.children).reduce(
    ($wrapper, $el, i) => {
      if (resultOfOneCycle[i]) {
        $el.insertBefore(downArrowEl(), $el.lastChild);
      }
      $wrapper.appendChild($el);
      return $wrapper;
    },
    document.createDocumentFragment()
  );

  $racingCarInner.replaceChildren(racingLines);
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

export const removeLoadingEl = () => {
  $racingCar.querySelectorAll('.loading').forEach(($el) => $el.remove());
};
