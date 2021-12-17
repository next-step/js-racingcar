import Component from "./core/Component.js";
import InputForms from "./components/InputForms.js";
import PlayGround from "./components/PlayGround.js";
import WinnerSection from "./components/winnerSection.js";
import { errorMsgs } from "./constants.js";

export default class App extends Component {
  setup() {
    this.$state = {
      carNames: [],
      trialCount: 0,
      progress: [],
      winners: [],
    };
  }

  template() {
    return /*html*/ `
    <section class="d-flex justify-center mt-5 input-section"></section>
    <section class="d-flex justify-center mt-5 playground"></section>
    <section class="d-flex justify-center mt-5 winner-section"></section>`;
  }

  mounted() {
    const { getCarName, getTrialCount, generateRandomArray, getWinner } = this;
    const { carNames, trialCount, progress, winners } = this.$state;
    const $inputSection = this.$target.querySelector(".input-section");
    const $playGround = this.$target.querySelector(".playground");
    const $winnerSection = this.$target.querySelector(".winner-section");

    new InputForms($inputSection, {
      getCarName: getCarName.bind(this),
      getTrialCount: getTrialCount.bind(this),
    });

    if (carNames !== [] && trialCount !== 0) {
      // progress에 2차원 배열 생성하기
      for (let i = 0; i < carNames.length; i++) {
        progress.push(generateRandomArray(trialCount));
      }
      new PlayGround($playGround, { carNames, trialCount, progress });

      const progressLength = progress.map((item) => {
        return item.reduce((prev, cur) => prev + cur);
      });

      winners.push(...getWinner(progressLength, carNames));
    }

    if (winners.length !== 0) {
      new WinnerSection($winnerSection, { winners, carNames });
    }
  }

  getWinner(arr, carNames) {
    const maxLength = Math.max(...arr);
    let result = [];
    arr.map((item, index) => {
      if (item === maxLength) {
        result.push(carNames[index]);
      }
    });
    return result;
  }

  getCarName(inputs) {
    const newCarNames = inputs.split(",");
    let breakFlag = false;

    newCarNames.forEach((carName) => {
      if (carName.length > 5) {
        alert(errorMsgs.MAX_LENGTH_NAME);
        breakFlag = true;
      }

      if (carName.length === 0) {
        alert(errorMsgs.EMPTY_NAME);
        breakFlag = true;
      }
    });

    if (breakFlag) return false;

    this.setState({
      carNames: [...newCarNames],
    });

    return true;
  }

  getTrialCount(inputs) {
    this.setState({
      trialCount: inputs,
    });
  }

  generateRandomArray(amount) {
    return Array.from({ length: amount }).map(() =>
      Math.floor(Math.random() * 9 + 1) >= 4 ? 1 : 0
    );
  }
}
