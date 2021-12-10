class Store {
  tag = "[Store]"
  #runCount;
  #observers;
  #cars;

  init() {
    this.#runCount = 0; //
    this.#observers = [];
    this.#cars = []; //

    return this;
  }

  set count(count) {
    this.#runCount = count;
  }

  get cars() {
    return this.#cars;
  }

  getDetails(event) { //
    switch (event) {
      case "start-racing":
        return {
          runCount: this.#runCount,
          carNames: this.#cars
        };
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
