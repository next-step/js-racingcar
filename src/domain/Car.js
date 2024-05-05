import Name from './Name';
import Move from './Move';

class Car extends Move {
  #carName;

  static FORWARD_OR_STOP_DEFAULT_OPTIONS = {
    FORWARD_LIMIT: 4,
    MOVE_SIZE: 1,
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
    {
      forwardLimit = Car.FORWARD_OR_STOP_DEFAULT_OPTIONS.FORWARD_LIMIT,
      moveSize = Car.FORWARD_OR_STOP_DEFAULT_OPTIONS.MOVE_SIZE,
    } = Car.FORWARD_OR_STOP_DEFAULT_OPTIONS
  ) {
    if (forwardValue >= forwardLimit) {
      return super.forward(moveSize);
    }
    return this;
  }
}

export default Car;
