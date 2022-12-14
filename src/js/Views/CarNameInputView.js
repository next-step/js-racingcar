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

  onClick = ({ onClickButton }) => {
    this.submitButton.addEventListener('click', (e) => {
      onClickButton({ inputElement: this.inputElement }, e);
    });
    this.rootElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        onClickButton({ inputElement: this.inputElement });
      }
    });
  };

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
