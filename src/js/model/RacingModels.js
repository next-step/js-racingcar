export default class RacingModel {
  /* 
    관리해야 할 데이터
    - [] 자동차 이름
    - [] 시도 횟수
  */

  constructor() {
    this.carNames = [];
    this.tryCount = 0;
  }

  getCarNames() {
    return this.carNames;
  }

  setCarNames(carName) {
    this.carNames.push(carName);
  }

  getTryCount() {
    return this.tryCount;
  }

  setTryCount(count) {
    this.tryCount = count;
  }
}
