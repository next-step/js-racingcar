export default class MovingStrategy {
  // eslint-disable-next-line class-methods-use-this
  isMoveable() {
    throw new Error(
      'MovingStrategy는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }
}
