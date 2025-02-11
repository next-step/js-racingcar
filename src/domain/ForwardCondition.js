class ForwardCondition {
  canAccelerate() {
    throw new Error("canAccelerate() 메서드를 구현해야 합니다.");
  }
}

class RandomForwardCondition extends ForwardCondition {
  static MOVE_THRESHOLD = 4;

  canAccelerate() {
    return (
      Math.floor(Math.random() * 10) >= RandomForwardCondition.MOVE_THRESHOLD
    );
  }
}

export { ForwardCondition, RandomForwardCondition };
