class Car {
  static ERROR_MESSAGES = {
    INVALID_NAMES: "자동차 이름 목록이 올바르지 않습니다.",
  };

  constructor(name, forwardCondition) {
    this.name = new CarName(name);
    this.position = new Position();
    this.forwardCondition = forwardCondition;
  }

  static createCars(names, forwardCondition) {
    if (!Array.isArray(names) || names.length === 0) {
      throw new Error(Car.ERROR_MESSAGES.INVALID_NAMES);
    }
    const carNameBlankRegex = /^\s*$/;
    if (names.some((name) => carNameBlankRegex.test(name))) {
      throw new Error(Car.ERROR_MESSAGES.INVALID_NAMES);
    }
    return names.map((name) => new Car(name, forwardCondition));
  }

  moveForward() {
    if (!this.forwardCondition.canMoveForward()) {
      return;
    }
    this.position.moveForward();
  }
}

class CarName {
  static MAX_NAME_LENGTH = 5;
  static MIN_NAME_LENGTH = 1;
  static ERROR_MESSAGES = {
    INVALID_NAME: `자동차 이름은 ${CarName.MIN_NAME_LENGTH}자 이상 ${CarName.MAX_NAME_LENGTH}자 이하만 가능합니다.`,
  };

  constructor(value) {
    if (!CarName.isValidName(value)) {
      throw new Error(CarName.ERROR_MESSAGES.INVALID_NAME);
    }
    this.value = value;
  }

  static isValidName(value) {
    return (
      typeof value === "string" &&
      value.length >= this.MIN_NAME_LENGTH &&
      value.length <= this.MAX_NAME_LENGTH
    );
  }
}

class Position {
  static ERROR_MESSAGES = {
    INVALID_POSITION: "자동차 위치는 0 이상의 정수여야 합니다.",
  };

  constructor(value = 0) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(Position.ERROR_MESSAGES.INVALID_POSITION);
    }
    this.value = value;
  }

  moveForward() {
    this.value += 1;
  }
}

export { Car, CarName, Position };
