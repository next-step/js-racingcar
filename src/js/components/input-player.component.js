import { Component } from './component.js';
import { InputPlayerStateService } from '../services/input-player-state.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputPlayerComponent extends Component {
  #inputPlayerState;
  #playerState;
  $inputPlayer = '#input-player';
  $btnSubmit = '#btn-submit-player';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#inputPlayerState = new InputPlayerStateService(this.$inputPlayer);
    this.setEventListener();
  }

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
    if (!this.#inputPlayerState.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_PLAYER);
      return;
    }

    this.#inputPlayerState.disable(this.$inputPlayer);
    this.#inputPlayerState.disable(this.$btnSubmit);
    this.#playerState.player = this.#inputPlayerState.getValue();
  };
}
