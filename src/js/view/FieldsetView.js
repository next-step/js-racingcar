class FieldsetView {
  constructor(Fieldset, FieldsetInput) {
    this.Fieldset = Fieldset;
    this.FieldsetInput = FieldsetInput;
  }

  getInputValue() {
    return this.FieldsetInput.value;
  }

  getSplitInputValue() {
    return this.FieldsetInput.value.split(',');
  }

  applyFieldsetDisabled() {
    this.Fieldset.disabled = true;
  }
}

export default FieldsetView;
