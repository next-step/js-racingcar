import Component from '../core/Component';
import { $ } from '../utils/querySelector';

interface FormElement extends HTMLFormControlsCollection {
  'try-amount': HTMLInputElement;
}

class TryAmountForm extends Component {
  template = /*html*/ `
    <form id="try-amount-form">
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" name="try-amount" class="w-100 mr-2" placeholder="시도 횟수" />
        <button class="btn btn-cyan">확인</button>
      </div>
    </form>
  `;

  $tryAmountForm?: HTMLFormElement;

  deriveChildren(): void {
    this.$tryAmountForm = $('#try-amount-form', this) as HTMLFormElement;
  }

  bindEvents(): void {
    this.$tryAmountForm?.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const tryAmount = ((event.currentTarget as HTMLFormElement).elements as FormElement)[
      'try-amount'
    ].valueAsNumber;

    if (tryAmount < 1) {
      alert('유효하지 않은 시도 횟수 입니다. 다시 입력 해주세요.');
      return;
    }

    this.props.setTryAmount(tryAmount);
  }
}

customElements.define('my-try-amount-form', TryAmountForm);
