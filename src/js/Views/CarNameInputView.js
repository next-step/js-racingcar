import { View } from "../core/View.js";

class CarNameInputView extends View {
  inputElement;
  submitButton;

  constructor() {
    const rootElement = document.getElementById('car-name-input-set');
    super(rootElement);
    this.inputElement = rootElement.getElementsByTagName('input')[0];
    this.submitButton = rootElement.getElementsByTagName('button')[0];
  }

  init = () => {
    this.rootElement.removeAttribute('disabled');
    this.inputElement.value = '';
  };

  disable = () => {
    this.rootElement.setAttribute('disabled', true);
  };
}

const carNameInputSetView = new CarNameInputView();

export { carNameInputSetView };
