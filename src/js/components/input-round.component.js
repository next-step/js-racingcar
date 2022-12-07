import { Component } from './component.js';
import { InputRoundStateService } from '../services/input-round-state.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputRoundComponent extends Component {
  #inputRoundState;
  $roundWrap = '.round-wrap';
  $inputRound = '#input-round';
  $btnSubmit = '#btn-submit-round';

  constructor(services) {
    super(services);

    this.#inputRoundState = new InputRoundStateService(this.$inputRound);
    this.playerState.observers = [...this.playerState.observers, this.init];
    this.setEventHandler();
  }

  init = () => {
    this.show(this.$roundWrap);
  };

  setEventHandler() {
    const events = [
      {
        target: this.$btnSubmit,
        event: 'click',
        handler: this.submit,
      },
    ];

    this.#inputRoundState.setEventListener(events);
  }

  submit = () => {
    if (!this.#inputRoundState.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_ROUND);
      return;
    }

    this.#inputRoundState.disable(this.$inputRound);
    this.#inputRoundState.disable(this.$btnSubmit);
    this.roundState.round = this.#inputRoundState.getValue();
  };
}
