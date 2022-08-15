import BaseInput from '../Base/Input.js';

export const MAX_NAME_LENGTH = 5;
export const MAX_NAME_LIST_LENGHT = 5;

export default class ViewCarPlayerNameInput extends BaseInput {
  constructor(app) {
    const $input = document.querySelector('#input-car-player-name');
    super(app, $input);
  }

  #validateOverPlayerNameLength(carPlayerNames) {
    return carPlayerNames.every(name => name.length <= MAX_NAME_LENGTH);
  }

  #validateEmptyPlayerName(carPlayerNames) {
    return carPlayerNames.every(carName => carName !== '');
  }

  #validateOverPlayerLength(carPlayerNames) {
    return carPlayerNames.length < MAX_NAME_LIST_LENGHT;
  }

  #validateDuplicatePlayerName(carPlayerNames) {
    return carPlayerNames.length === new Set(carPlayerNames).size;
  }

  #getValidationMessage(carPlayerNames) {
    if (!this.#validateOverPlayerNameLength(carPlayerNames)) {
      return '플레이어 이름은 5자 이하로 작성해 주세요.';
    }
    if (!this.#validateEmptyPlayerName(carPlayerNames)) {
      return '플레이어 이름을 입력해주세요.';
    }
    if (!this.#validateOverPlayerLength(carPlayerNames)) {
      return '플레이어 이름을 5개이하로 입력해주세요.';
    }
    if (!this.#validateDuplicatePlayerName(carPlayerNames)) {
      return '중복된 플레이어가 있습니다 다시 입력해 주세요.';
    }
    return '';
  }

  setValidity(event) {
    const { value } = event.target;
    const carPlayerNames = value.split(',').map(name => name.trim());
    const validationMessage = this.#getValidationMessage(carPlayerNames);

    this.setCustomValidity(validationMessage);
  }
}
