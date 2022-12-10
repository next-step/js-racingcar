class Cars {
  #cars;

  set cars(cars) {
    this.#cars = cars;
  }

  get cars() {
    return this.#cars;
  }
}

export default Cars;
