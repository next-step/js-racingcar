export class EventModel {
  constructor() {
    this.listeners = {};
  }

  subscribe(type, listener) {
    if (!this.listeners) {
      console.warn(`this model has no listeners field`);
      return;
    }

    if (!this.listeners[type]) {
      console.warn(`this model has no listener property for ${type}`);
      return;
    }

    this.listeners[type]?.push(listener);
  }

  notify(type, value) {
    this.listeners[type]?.forEach((listener) => listener(value));
  }

  bindEventToProperty(state, eventMap) {
    return new Proxy(state, {
      set(target, property, value) {
        if (Object.hasOwnProperty.call(eventMap, property)) {
          eventMap[property](value);
        }

        target[property] = value;
        return true;
      },
    });
  }
}
