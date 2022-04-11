export default class AbstractView {
  static eventBindings() {
    throw new Error(
      'AbstractView는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }

  static initialize() {
    throw new Error(
      'AbstractView는 추상 클래스입니다. 별도의 구현이 필요합니다.'
    );
  }
}
