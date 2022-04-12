import { ERROR } from '../constants/message.js';

class MovingStrategy {
  build() {
    throw new Error(ERROR.ABSTRACT_CLASS);
  }
  isMoveable() {
    throw new Error(
      'MovingStrategy는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }
}

class RandomMovingStrategy extends MovingStrategy {
  static build() {
    return new RandomMovingStrategy();
  }

  isMoveable() {
    return Math.random() * 10 > 4;
  }
}

class AlwaysMovingStrategy extends MovingStrategy {
  static build() {
    return new AlwaysMovingStrategy();
  }

  isMoveable() {
    return true;
  }
}

class NotMovingStrategy extends MovingStrategy {
  static build() {
    return new NotMovingStrategy();
  }

  isMoveable() {
    return false;
  }
}
class ToggleMovingStrategy extends MovingStrategy {
  static build() {
    return new ToggleMovingStrategy();
  }

  toggle = false;
  isMoveable() {
    this.toggle = !this.toggle;
    return this.toggle;
  }
}

export {
  MovingStrategy,
  RandomMovingStrategy,
  AlwaysMovingStrategy,
  NotMovingStrategy,
  ToggleMovingStrategy,
};
