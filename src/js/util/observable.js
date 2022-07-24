class Observable {
  constructor() {
    this.observers = {};
  }

  subscribe(key, cb, context) {
    this.observers[key] = this.observers[key] || [];
    this.observers[key].push({ cb, context });
  }

  unSubscribe(key, context) {
    this.observers = this.observers[key].filter(({ context: ctx }) => ctx !== context);
  }

  notify(key, ...args) {
    this.observers[key].forEach(({ cb }) => cb(...args));
  }
}

export default new Observable();
