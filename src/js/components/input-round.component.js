import { Component } from './component.js';
import { InputRoundStateService } from '../services/input-round-state.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputRoundComponent extends Component {
  #inputRoundState;
  #playerState;
  #roundState;
  $racingForm = '#racing-form';
  $roundField = '#round-field';
  $inputRound = '#input-round';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#roundState = this.services.stateManager.roundState;
    this.#inputRoundState = new InputRoundStateService(this.$inputRound);
    this.#playerState.observers = [...this.#playerState.observers, this.init];
    this.setEventListener();
  }

  init = () => {
    this.show(this.$roundField);
  };

  setEventListener() {
    const events = [
      {
        target: this.$racingForm,
        event: 'submit',
        handler: this.submit,
      },
    ];

    super.setEventListener(events);
  }

  submit = (e) => {
    e.preventDefault();

    if (!this.#inputRoundState.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_ROUND);

      return;
    }

    this.#inputRoundState.disable(this.$roundField);
    this.#roundState.round = this.#inputRoundState.getValue();
  };
}
