import { $ } from "./utils.js";

export default class RacingGame {
  carName;
  tryCount;
  progressState;

  constructor() {
    this.test();
    this.dom();
    this.setEvent();
    this.progressState = [];
  }

  dom() {
    this.$carNameSubmitBtn = $(".car-name-submit-btn");
    this.$tryCountSubmitBtn = $(".try-count-submit-btn");
    this.$carNameInput = $(".car-name-input");
    this.$tryCountInput = $(".try-count-input");
  }

  test() {
    console.log("loading test");
  }

  setEvent() {
    // 이름 제출 버튼에 이벤트
    this.$carNameSubmitBtn.addEventListener(
      "click",
      this.getCarName.bind(this)
    );
    // 시도 횟수 이벤트
    this.$tryCountSubmitBtn.addEventListener(
      "click",
      () => {
        this.getTryCount();
        this.getProgressState();
      }
      //   this.getTryCount.bind(this)
    );
  }

  getTryCount() {
    const newTryCount = this.$tryCountInput.value;
    if (!this.checkTryCount(newTryCount)) {
      return;
    }
    this.tryCount = newTryCount;
  }

  getCarName() {
    const newCarName = this.$carNameInput.value.replaceAll(" ", "").split(",");
    if (!newCarName.every((carName) => this.checkCarName(carName))) return;
    this.carName = newCarName;
  }

  checkCarName(carName) {
    if (carName.length > 5) {
      alert("초과");
      return false;
    }

    if (carName.length === 0) {
      alert("빔");
      return false;
    }
    return true;
  }

  checkTryCount(count) {
    if (count === "") {
      alert("횟수를 입력해주세요");
      return false;
    }
    if (Number(count) < 0) {
      alert("0보다 큰 수를 입력해주세요");
      return false;
    }
    return true;
  }

  // carName = ['a', 'b']
  //    progressState = [[1,1,1,1,1], []]
  getProgressState() {
    this.carName.forEach(() => {
      this.progressState.push(this.generateRandomNumber());
    });
    console.log(this.progressState);
  }

  generateRandomNumber() {
    return Array.from({ length: this.tryCount }).map(() =>
      Math.floor(Math.random() * 9) + 1 > 4 ? 1 : 0
    );
  }
}
