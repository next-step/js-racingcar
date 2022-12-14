import { Component } from './component.js';
import { PlayerFormControlService } from '../services/player-form-control.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputPlayerComponent extends Component {
  #playerFormControl;
  #playerState;
  $playerField = '#player-field';
  $inputPlayer = '#input-player';
  $btnSubmit = '#btn-submit-player';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#playerFormControl = new PlayerFormControlService(this.$inputPlayer);
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
    if (!this.#playerFormControl.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_PLAYER);

      return;
    }

    this.#playerFormControl.disable(this.$playerField);
    this.#playerState.player = this.#playerFormControl.getValue();
  };
}
