export class Component {
  services;
  template;

  constructor(services) {
    this.services = services;
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
}
