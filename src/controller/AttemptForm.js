import BaseController from './BaseController.js';

export default class AttemptForm extends BaseController {
  constructor(state) {
    super(state);

    this.$form = document.querySelector('#form-attempt');
  }

  hasCarPlayerName() {
    return this.state.carPlayerNames.length > 0;
  }

  visible() {
    this.$form.classList.remove('d-none');
  }

  invisible() {
    this.$form.classList.add('d-none');
  }

  render() {
    if (this.hasCarPlayerName()) {
      this.visible();
    } else {
      this.invisible();
    }
  }
}
