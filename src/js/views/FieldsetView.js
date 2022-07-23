import { $ } from '../utils/index.js';
import View from './View.js';

class FieldsetView extends View {
  /** @type {HTMLInputElement} */
  #input;

  /** @type {HTMLButtonElement} */
  #button;

  constructor(target) {
    super(target);

    this.#input = $('input', this._target);
    this.#button = $('button', this._target);
  }

  get value() {
    return this.#input.value;
  }

  disable() {
    this.#input.disabled = true;
    this.#button.disabled = true;
  }

  addButtonClickListener(callback) {
    this.#button?.addEventListener('click', () => {
      callback(this.#input.value);
    });
  }
}

export default FieldsetView;
