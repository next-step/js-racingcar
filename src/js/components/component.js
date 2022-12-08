export class Component {
  playerState;
  roundState;
  template;

  constructor(services) {
    this.playerState = services.stateManager.playerState;
    this.roundState = services.stateManager.roundState;
  }

  setEventListener(events = []) {
    if (!events.length) {
      return;
    }

    events.forEach(e => {
      const target = document.querySelector(e.target);

      target.addEventListener(e.event, e.handler);
    });
  }

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
