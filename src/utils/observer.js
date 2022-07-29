export class Observer {
  constructor() {
    this.observers = {};
  }
  // { key: [fn1, fn2,...]}
  // { carName: [validateNames(),...]}
  subscribe(key, fn) {
    this.observers[key] = this.observers[key] || [];
    this.observers[key].push(fn);
  }

  notify(key, ...args) {
    this.observers[key].forEach((fn) => fn(...args));
  }
}
