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
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </form>
  `;

  $tryAmountForm?: HTMLFormElement;
  $tryAmountInput?: HTMLInputElement;
  $submit?: HTMLButtonElement;

  deriveChildren() {
    this.$tryAmountForm = $('#try-amount-form', this) as HTMLFormElement;
    this.$tryAmountInput = $('input[name="try-amount"]', this) as HTMLInputElement;
    this.$submit = $('button[type="submit"]', this) as HTMLButtonElement;
  }

  bindEvents() {
    this.$tryAmountForm?.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const tryAmount = this.$tryAmountInput!.valueAsNumber;

    if (tryAmount < 1) {
      alert('유효하지 않은 시도 횟수 입니다. 다시 입력 해주세요.');
      return;
    }

    this.props.setTryAmount(tryAmount);
    this.props.processNextPhase();
  }

  onUpdate() {
    this.props.disabled ? this.disableForm() : this.enableForm();
  }

  disableForm() {
    this.$tryAmountInput!.disabled = true;
    this.$submit!.disabled = true;
  }

  enableForm() {
    this.$tryAmountInput!.disabled = false;
    this.$submit!.disabled = false;
    this.$tryAmountForm?.reset();
  }
}

customElements.define('my-try-amount-form', TryAmountForm);
