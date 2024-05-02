import Name from './Name';
import Move from './Move';

class Car extends Move {
  #carName;

  static FORWARD_LIMIT = 4;
  static DEFAULT_MOVE_SIZE = 1;
  static DEFAULT_FORWARD_OR_STOP_OPTIONS = {
    forwardLimit: Car.FORWARD_LIMIT,
    moveSize: Car.DEFAULT_MOVE_SIZE,
  };

  constructor(carName) {
    super();
    this.#carName = new Name(carName).name;
  }

  get carName() {
    return this.#carName;
  }

  forwardOrStop(
    forwardValue,
    { forwardLimit, moveSize } = Car.DEFAULT_FORWARD_OR_STOP_OPTIONS
  ) {
    if (forwardValue >= forwardLimit) {
      return super.forward(moveSize);
    }
    return this;
  }
}

export default Car;
