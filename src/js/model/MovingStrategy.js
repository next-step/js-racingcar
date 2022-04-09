class MovingStrategy {
  isMoveable() {
    throw new Error(
      'MovingStrategy는 추상 클래스입니다. 별도의 구현을 통해 접근이 필요합니다.'
    );
  }
}

class RandomMovingStrategy extends MovingStrategy {
  isMoveable() {
    return Math.random() * 10 > 4;
  }
}

export { MovingStrategy, RandomMovingStrategy };
