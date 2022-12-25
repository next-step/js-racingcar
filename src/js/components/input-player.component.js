import { Component } from './component.js';
import { PlayerFormControlService } from '../services/player-form-control.service.js';
import { ErrorMessage } from '../common/enum.js';

export default class InputPlayerComponent extends Component {
  #playerFormControl;
  #playerState;
  #resetState;
  $playerForm = '#player-form';
  $playerField = '#player-field';
  $inputPlayer = '#input-player';

  constructor(services) {
    super(services);

    this.#playerState = this.services.stateManager.playerState;
    this.#resetState = this.services.stateManager.resetState;
    this.#resetState.observers = [...this.#resetState.observers, this.reset];
    this.#playerFormControl = new PlayerFormControlService(this.$inputPlayer);
    this.setEventListener();
  }

  reset = () => {
    this.#playerFormControl.clearForm(this.$playerForm);
    this.#playerFormControl.enable(this.$playerField);
  };

  setEventListener() {
    const events = [
      {
        target: this.$playerForm,
        event: 'submit',
        handler: this.submit,
      },
    ];

    super.setEventListener(events);
  }

  submit = (e) => {
    e.preventDefault();

    if (!this.#playerFormControl.validate()) {
      document.defaultView.alert(ErrorMessage.INVALID_PLAYER);

      return;
    }

    this.#playerFormControl.disable(this.$playerField);
    this.#playerState.value = this.#playerFormControl.getValue();
  };
}
