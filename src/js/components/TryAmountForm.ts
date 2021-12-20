import Component from '../core/Component';

class TryAmountForm extends Component {
  template = /*html*/ `
    <form>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    </form>
  `;
}

customElements.define('my-try-amount-form', TryAmountForm);
