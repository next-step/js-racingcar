import { $carNameInput } from './utils/dom.js';
import racingAdmin from './racingAdmin.js';
import { validNames } from './validate.js';

export const handleCarNameButton = (e) => {
  e.preventDefault();
  const inputValues = $carNameInput.value;
  const carNames = racingAdmin.splitComma(inputValues);

  if (!validNames(carNames)) {
    racingAdmin.focusInput();
  }

  racingAdmin.setCarName(carNames);
  racingAdmin.showCarNames(carNames);
};
