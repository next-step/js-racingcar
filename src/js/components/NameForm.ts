import Component from '../core/Component';
import { $ } from '../utils/querySelector';

interface FormElement extends HTMLFormControlsCollection {
  'car-names': HTMLInputElement;
}

const MAX_CAR_NAME_LENGTH = 5;

const isValidCarNames = (carNames: string[]) => {
  return carNames.every((carName) => carName.length <= MAX_CAR_NAME_LENGTH);
};

class NameForm extends Component {
  template = /*html*/ `
    <form>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input name="car-names" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button class="btn btn-cyan">확인</button>
      </div>
    </form>
  `;

  $nameForm?: HTMLFormElement;

  setElements(): void {
    this.$nameForm = $('form') as HTMLFormElement;
  }

  bindEvents(): void {
    this.$nameForm!.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const carNames = this.getCarNames((event.currentTarget as HTMLFormElement).elements);

    if (!isValidCarNames(carNames)) {
      alert('유효하지 않은 자동차 이름입니다. 다시 입력 해주세요.');
      return;
    }

    this.props.setCarNames(carNames);
  }

  getCarNames(elements: HTMLFormControlsCollection) {
    return (elements as FormElement)['car-names'].value.split(',').map((name) => name.trim());
  }
}

customElements.define('my-name-form', NameForm);
