import Component from "./core/Component.js";
import InputForms from "./components/InputForms.js";
import PlayGround from "./components/PlayGround.js";

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
    const $inputSection = this.$target.querySelector(".input-section");
    const $playGround = this.$target.querySelector(".playground");

    new InputForms($inputSection, {
      getCarName: getCarName.bind(this),
      getTrialCount: getTrialCount.bind(this),
    });

    if (this.$state.carNames !== [] && this.$state.trialCount !== 0) {
      new PlayGround($playGround, {
        carNames: this.$state.carNames,
        trialCount: this.$state.trialCount,
      });
    }
  }

  getCarName(inputs) {
    const newCarNames = inputs.split(",");
    let breakFlag = false;

    newCarNames.forEach((carName) => {
      if (carName.length > 5) {
        alert("이름이 5자 넘어가면 안됩니다.");
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
