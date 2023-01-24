class RacingCar {
  constructor(cars = [], count, record = {}, winners = []) {
    this.cars = cars;
    this.count = count;
    this.record = record;
    this.winners = winners;
  }

  get cars() {
    return this._cars;
  }

  set cars(value) {
    return (this._cars = value);
  }

  get count() {
    return this._count;
  }

  set count(value) {
    return (this._count = value);
  }

  get record() {
    return this._record;
  }

  set record(value) {
    return (this._record = value);
  }
  get winners() {
    return this._winners;
  }

  set winners(value) {
    return (this._winners = value);
  }
}

export default new RacingCar();
