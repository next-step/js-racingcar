import { Component } from './component.js';
import { RoundFormControlService } from '../services/round-form-control.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputRoundComponent extends Component {
  #roundFormControl;
  #playerState;
  #roundState;
  $roundForm = '#round-form';
  $roundField = '#round-field';
  $inputRound = '#input-round';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#roundState = this.services.stateManager.roundState;
    this.#roundFormControl = new RoundFormControlService(this.$inputRound);
    this.#playerState.observers = [...this.#playerState.observers, this.init];
    this.setEventListener();
  }

  init = () => {
    this.show(this.$roundForm);
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
    this.#roundState.round = this.#roundFormControl.getValue();
  };
}
