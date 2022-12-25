import { Component } from './component.js';
import { RoundFormControlService } from '../services/round-form-control.service.js';
import { ErrorMessage } from '../common/enum.js';
import DomUtil from '../utils/dom.util.js';

export default class InputRoundComponent extends Component {
  #roundFormControl;
  #playerState;
  #roundState;
  #resetState;
  $roundForm = '#round-form';
  $roundField = '#round-field';
  $inputRound = '#input-round';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#roundState = this.services.stateManager.roundState;
    this.#resetState = this.services.stateManager.resetState;
    this.#roundFormControl = new RoundFormControlService(this.$inputRound);
    this.#playerState.observers = [...this.#playerState.observers, this.init];
    this.#resetState.observers = [...this.#resetState.observers, this.reset];
    this.setEventListener();
  }

  init = () => {
    DomUtil.show(this.$roundForm);
  };

  reset = () => {
    DomUtil.hide(this.$roundForm);
    this.#roundFormControl.clearForm(this.$roundForm);
    this.#roundFormControl.enable(this.$roundField);
  };

  setEventListener() {
    const events = [
      {
        target: this.$roundForm,
        event: 'submit',
        handler: this.submit,
      },
    ];

    super.setEventListener(events);
  }

  submit = (e) => {
    e.preventDefault();

    if (!this.#roundFormControl.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_ROUND);

      return;
    }

    this.#roundFormControl.disable(this.$roundField);
    this.#roundState.value = this.#roundFormControl.getValue();
  };
}
