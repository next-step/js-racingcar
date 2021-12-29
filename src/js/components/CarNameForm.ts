import Component from '../core/Component';
import { $ } from '../utils/querySelector';

interface FormElement extends HTMLFormControlsCollection {
  'car-names': HTMLInputElement;
}

const MAX_CAR_NAME_LENGTH = 5;
const MAX_CAR_AMOUNT = 10;

const ERROR_CODE = {
  EXCEED_MAX_CAR_NAME_LENGTH: 'exceedMaxCarNameLength',
  TOO_MANY_CARS: 'tooManyCars',
  DUPLICATED_NAME: 'duplicatedName',
};

export const ERROR_MESSAGE = {
  [ERROR_CODE.EXCEED_MAX_CAR_NAME_LENGTH]: `최대 이름 길이를 초과하였습니다. ${MAX_CAR_NAME_LENGTH}글자 이내로 입력해주세요.`,
  [ERROR_CODE.TOO_MANY_CARS]: `너무 많은 자동차를 입력하였습니다. ${MAX_CAR_AMOUNT}대 이하로 입력해주세요.`,
  [ERROR_CODE.DUPLICATED_NAME]: `중복된 자동차 이름이 있습니다.`,
};

const validateCarNames = (carNames: string[]) => {
  const exceedMaxCarNameLength = carNames.every((carName) => carName.length > MAX_CAR_NAME_LENGTH);
  const tooManyCars = carNames.length > MAX_CAR_AMOUNT;
  const duplicatedName = [...new Set(carNames)].length < carNames.length;

  if (exceedMaxCarNameLength) return ERROR_CODE.EXCEED_MAX_CAR_NAME_LENGTH;
  if (tooManyCars) return ERROR_CODE.TOO_MANY_CARS;
  if (duplicatedName) return ERROR_CODE.DUPLICATED_NAME;

  return null;
};

class CarNameForm extends Component {
  template = /*html*/ `
    <form id="name-form">
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input name="car-names" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </form>
  `;

  $nameForm?: HTMLFormElement;
  $nameInput?: HTMLInputElement;
  $nameSubmit?: HTMLButtonElement;

  deriveChildren() {
    this.$nameForm = $('#name-form', this) as HTMLFormElement;
    this.$nameInput = $('input[name="car-names"]', this) as HTMLInputElement;
    this.$nameSubmit = $('button[type="submit"]', this) as HTMLButtonElement;
  }

  bindEvents() {
    this.$nameForm!.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const carNames = this.getCarNames();
    const errorCode = validateCarNames(carNames);

    if (errorCode) {
      alert(ERROR_MESSAGE[errorCode]);
      return;
    }

    this.props.setCars(carNames);
    this.props.processNextPhase();
  }

  getCarNames() {
    return this.$nameInput!.value.split(',').map((name) => name.trim());
  }

  onUpdate() {
    this.props.disabled ? this.disableForm() : this.enableForm();
  }

  disableForm() {
    this.$nameInput!.disabled = true;
    this.$nameSubmit!.disabled = true;
  }

  enableForm() {
    this.$nameInput!.disabled = false;
    this.$nameSubmit!.disabled = false;
    this.$nameForm?.reset();
  }
}

customElements.define('my-name-form', CarNameForm);
