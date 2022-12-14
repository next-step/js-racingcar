import { View } from "../core/View.js";

class CountInputSetView extends View {
  inputElement;
  submitButton;

  constructor() {
    const rootElement = document.getElementById('count-input-set');
    super(rootElement);
    this.inputElement = rootElement.getElementsByTagName('input')[0];
    this.submitButton = rootElement.getElementsByTagName('button')[0];
  }

  addButtonClickListener = (onClick) => {
    this.submitButton.addEventListener('click', (e) => {
      onClick({ inputElement: this.inputElement }, e);
    });
    this.rootElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        onClick({ inputElement: this.inputElement });
      }
    });
  };

  init = () => {
    this.hide();
    this.rootElement.removeAttribute('disabled');
    this.inputElement.value = '';
  };

  disable = () => {
    this.rootElement.setAttribute('disabled', true);
  };
}

const countInputSetView = new CountInputSetView();

export { countInputSetView };
