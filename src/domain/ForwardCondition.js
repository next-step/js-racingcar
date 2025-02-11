class ForwardCondition {
  canMoveForward() {
    throw new Error("canMoveForward() 메서드를 구현해야 합니다.");
  }
}

class RandomForwardCondition extends ForwardCondition {
  static MOVE_THRESHOLD = 4;

  canMoveForward() {
    return (
      Math.floor(Math.random() * 10) >= RandomForwardCondition.MOVE_THRESHOLD
    );
  }
}

export { ForwardCondition, RandomForwardCondition };
