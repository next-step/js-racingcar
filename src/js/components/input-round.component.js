import { Component } from './component.js';
import { InputRoundStateService } from '../services/input-round-state.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputRoundComponent extends Component {
  #inputRoundState;
  #playerState;
  #roundState;
  $roundWrap = '.round-wrap';
  $inputRound = '#input-round';
  $btnSubmit = '#btn-submit-round';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#roundState = this.services.stateManager.roundState;
    this.#inputRoundState = new InputRoundStateService(this.$inputRound);
    this.#playerState.observers = [...this.#playerState.observers, this.init];
    this.setEventListener();
  }

  init = () => {
    this.show(this.$roundWrap);
  };

  setEventListener() {
    const events = [
      {
        target: this.$btnSubmit,
        event: 'click',
        handler: this.submit,
      },
    ];

    super.setEventListener(events);
  }

  submit = () => {
    if (!this.#inputRoundState.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_ROUND);
      return;
    }

    this.#inputRoundState.disable(this.$inputRound);
    this.#inputRoundState.disable(this.$btnSubmit);
    this.#roundState.round = this.#inputRoundState.getValue();
  };
}
