class Observer {
  constructor() {
    this.observers = new Set();
  }

  subscribe(nextObserver) {
    this.observers.add(nextObserver);
  }

  notify() {
    this.observers.forEach((observer) => {
      observer();
    });
  }
}

export default Observer;
