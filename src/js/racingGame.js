// import {$, removeBlank} from "./utils/utils.js";
//
// export default class RacingGame {
//   carName;
//   tryCount;
//   progressState;
//
//   constructor() {
//     this.test();
//     this.dom();
//     this.setEvent();
//     this.progressState = [];
//
//   }
//
//   dom() {
//     this.$carNameSubmitBtn = $(".car-name-submit-btn");
//     this.$tryCountSubmitBtn = $(".try-count-submit-btn");
//     this.$carNameInput = $(".car-name-input");
//     this.$tryCountInput = $(".try-count-input");
//   }
//
//   test() {
//     console.log("loading test");
//   }
//
//   setEvent() {
//     // 이름 제출 버튼에 이벤트
//     this.$carNameSubmitBtn.addEventListener("click", () => {
//       console.log('cl');
//     });
//
//     // 시도 횟수 이벤트
//     this.$tryCountSubmitBtn.addEventListener("click", () => {
//         this.getTryCount();
//         this.getProgressState();
//       }
//     );
//   }
//
//   getTryCount() {
//     const newTryCount = this.$tryCountInput.value;
//     if (!this.checkTryCount(newTryCount)) return;
//     this.tryCount = newTryCount;
//   }
//
//   getCarName() {
//     const carNameInputValue = this.$carNameInput.value;
//     if (carNameInputValue.length === 0) throw Error('자동차 이름을 입력해주세요.');
//     const carNames = removeBlank(carNameInputValue).split(',');
//     if (this.isValidCarNames(carNames)) return;
//     this.carName = carNames;
//   }
//
//   isValidCarNames(carNames) {
//     carNames.forEach((carName, idx) => {
//       if (carName.length === 0) throw Error('자동차 이름을 입력해주세요.');
//       if (carName.length > 5) throw Error('자동차 이름이 너무 깁니다.');
//     });
//   }
//
//   checkTryCount(count) {
//     if (count === "") throw Error('횟수를 입력해주세요');
//     if (Number(count) < 0) throw Error('0보다 큰 수를 입력해주세요');
//   }
//
//   getProgressState() {
//     this.progressState = [...Array(this.carName.length)].map(() => this.generateRandomNumber());
//     console.log(this.progressState);
//   }
//
//   generateRandomNumber() {
//     return Array.from({ length: this.tryCount }).map(() =>
//       Math.floor(Math.random() * 9) + 1 > 4
//         ? 1
//         : 0
//     );
//   }
// }
