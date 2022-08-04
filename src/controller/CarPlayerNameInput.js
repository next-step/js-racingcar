import BaseInput from './BaseInput.js';

export const NAME_MAX_LENGTH = 5;
export const NAME_LIST_MAX_LENGHT = 5;

export default class CarNameInput extends BaseInput {
  constructor() {
    const $input = document.querySelector('#input-car-player-name');
    super($input);
  }

  setValidity(event) {
    const { value } = event.target;
    const carNames = value.split(',').map(carName => carName.trim());

    if (carNames.some(carName => carName.length > NAME_MAX_LENGTH)) {
      this.setCustomValidity('플레이어 이름은 5자 이하로 작성해 주세요.');
    } else if (carNames.some(carName => carName === '')) {
      this.setCustomValidity('플레이어 이름을 입력해주세요.');
    } else if (carNames.length >= NAME_LIST_MAX_LENGHT) {
      this.setCustomValidity('플레이어 이름을 5개이하로 입력해주세요.');
    } else if (carNames.length !== new Set(carNames).size) {
      this.setCustomValidity('중복된 플레이어가 있습니다 다시 입력해 주세요.');
    } else {
      this.setCustomValidity('');
    }
  }
}
