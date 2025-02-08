class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;

  name;
  location = Car.INITIAL_LOCATION;

  constructor(name) {
    if (name.length > 5)
      throw new Error('자동차 이름은 5자 이하만 입력 가능합니다.');

    this.name = name;
  }

  forward() {
    this.location += Car.FORWARD_STEP;
    return this.location;
  }

  get status() {
    return { name: this.name, location: this.location };
  }
}

export default Car;
