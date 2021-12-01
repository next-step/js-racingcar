import el from '../util/dom.js';
import View from './constructor.js';
import { Status, Actions } from '../types.js';
export default class FormAttempts extends View {
    static #template = /* html */ `
    <form>
      <fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" min="1" />
          <button type="submit" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>
    </form>
  `;
    $input;
    $form;
    constructor() {
        super();
        this.$form = el(FormAttempts.#template);
        this.$input = this.$form.querySelector('input');
        this.$form.addEventListener('submit', this.onSubmit);
        this.render(this.$form);
    }
    watch = ({ cars, totalAttempts, status }) => ({ cars, totalAttempts, status });
    onStoreUpdated({ cars, totalAttempts, status }) {
        if (status) {
            this.$input.disabled = status === Status.playing;
        }
        if (totalAttempts)
            return;
        if (cars) {
            if (cars.length)
                this.show().focus();
            else
                this.hide();
            return;
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.dispatch(Actions.setTotalAttempts, { totalAttempts: +this.$input.value });
        this.$form.reset();
    };
    focus = () => {
        this.$input.focus();
        return this;
    };
}
customElements.define('racingcar-form-attempts', FormAttempts);
//# sourceMappingURL=formAttempts.js.map