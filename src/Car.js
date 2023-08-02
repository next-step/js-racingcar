export const CAR_NAME_MAX_LENGTH = 5;
export const CAR_NAME_MIN_LENGTH = 1;

export const DEFAULT_INIT_POSITION = 0;
export const DEFAULT_CAR_SPEED = 1;
export const DEFAULT_MOVE_THRESHOLD = 4;

export class InvalidNameError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidNameError";
  }
}

export class Car {
  #name;
  #position = DEFAULT_INIT_POSITION;
  #speed = DEFAULT_CAR_SPEED;
  #moveThreshold = DEFAULT_MOVE_THRESHOLD;

  constructor(name, options = {}) {
    this.validateName(name);
    this.#name = name;
  }

  validateName(name) {
    if (typeof name !== "string" || name instanceof String) {
      throw new InvalidNameError("The name is not a string");
    }

    if (name.length < CAR_NAME_MIN_LENGTH) {
      throw new InvalidNameError("The name is too long");
    }

    if (name.length > CAR_NAME_MAX_LENGTH) {
      throw new InvalidNameError("The name is too short");
    }
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  get speed() {
    return this.#speed;
  }

  move(number) {
    if (number >= this.#moveThreshold) {
      this.#position += this.#speed;
    }
  }

  getDistance(fuel) {
    if (fuel >= this.#moveThreshold) {
      return this.#speed;
    }
    return 0;
  }
}
