export default class MovingStrategy {
  isMoveable() {
    throw new Error(
      'MovingStrategy는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }
}
