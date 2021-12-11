class Store {
  tag = "[Store]"
  #runCount;
  #observers;
  #cars;

  init() {
    this.#runCount = 0;
    this.#observers = [];
    this.#cars = [];

    return this;
  }

  set count(count) {
    this.#runCount = count;
  }

  get cars() {
    return this.#cars;
  }

  getDetails(event) {
    const carNames = this.#cars;
    const runCount = this.#runCount;

    switch (event) {
      case "start-racing":
        return { runCount, carNames };
      default: return {};
    }
  }

  notifyObserver(event) {
    this.#observers.forEach(observer => observer.emit(event, this.getDetails(event)));
  }

  registerCars(cars = []) {
    this.#cars = cars;
  }

  registerObserver(observer) {
    this.#observers.push(observer);
  }
}
export default new Store();
