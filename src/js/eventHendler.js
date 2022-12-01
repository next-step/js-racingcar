import { $carNameInput } from './utils/dom.js';
import racingAdmin from './racingAdmin.js';
import { isCorrectRange } from './validate.js';

export const handleCarNameButton = (e) => {
  e.preventDefault();
  const inputValues = $carNameInput.value;
  const trimInputValue = racingAdmin.trimValue(inputValues);
  const carNames = racingAdmin.splitComma(trimInputValue);

  // console.log(isCorrectRange(carNames));
  if (!isCorrectRange(carNames)) {
    return alert('글자 수 1~5사이의 자동차 이름을 입력하세요.');
  }
  racingAdmin.setCarName(carNames);
  racingAdmin.showCarNames(carNames);
};
