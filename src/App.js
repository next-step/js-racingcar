import Component from "./core/Component.js";
import InputForms from "./components/InputForms.js";
import PlayGround from "./components/PlayGround.js";
import { errorMsgs } from "./constants.js";

export default class App extends Component {
  setup() {
    this.$state = {
      carNames: [],
      trialCount: 0,
    };
  }

  template() {
    return /*html*/ `
    <section class="d-flex justify-center mt-5 input-section"></section>
    <section class="d-flex justify-center mt-5 playground"></section>`;
  }

  mounted() {
    const { getCarName, getTrialCount } = this;
    const { carNames, trialCount } = this.$state;
    const $inputSection = this.$target.querySelector(".input-section");
    const $playGround = this.$target.querySelector(".playground");

    new InputForms($inputSection, {
      getCarName: getCarName.bind(this),
      getTrialCount: getTrialCount.bind(this),
    });

    if (carNames !== [] && trialCount !== 0) {
      new PlayGround($playGround, { carNames, trialCount });
    }
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
}
