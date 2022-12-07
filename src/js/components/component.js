export class Component {
  playerState;
  roundState;
  template;

  constructor(services) {
    this.playerState = services.stateManager.playerState;
    this.roundState = services.stateManager.roundState;
  }

  setEventHandler() { }

  render(hostElement, template = this.template) {
    document.querySelector(hostElement).insertAdjacentHTML('beforeend', template);
  }

  show(element) {
    document.querySelector(element).classList.remove('hide');
  }

  hide(element) {
    document.querySelector(element).classList.add('hide');
  }
}
