import ValidateInput from './ValidateInput.js';

export default class CarNameInput extends ValidateInput {
  constructor() {
    const $input = document.querySelector('#input-car-name');
    super($input);
  }

  validate(event) {
    const { value } = event.target;
    const carNames = value.split(',').map(carName => carName.trim());

    if (carNames.some(carName => carName.length > 5)) {
      this.setCustomValidity('자동차 이름은 5자 이하로 작성해 주세요.');
    } else if (carNames.some(carName => carName === '')) {
      this.setCustomValidity('자동차 이름을 입력해주세요.');
    } else {
      this.setCustomValidity('');
    }
  }
}
