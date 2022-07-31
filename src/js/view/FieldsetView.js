class FieldsetView {
  constructor(Fieldset) {
    this.Fieldset = Fieldset;
  }

  getInputValue(inputElement) {
    return inputElement.value;
  }

  getSplitInputValue(inputElement) {
    return this.getInputValue(inputElement).split(',');
  }

  applyFieldsetDisabled() {
    this.Fieldset.disabled = true;
  }
}

export default FieldsetView;
