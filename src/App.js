import Component from "./core/Component.js";
import InputForms from "./components/InputForms.js";

export default class App extends Component {
  setup() {
    this.$state = {
      carNames: ["a", "b"],
      trialCount: 0,
    };
  }

  template() {
    return `<section class="d-flex justify-center mt-5 input-section">
    </section>`;
  }

  mounted() {
    console.log("mounted");
    console.log(this.$state.carNames);
    console.log(this.$state.trialCount);
    const { getCarName, getTrialCount } = this;
    const $inputSection = this.$target.querySelector(".input-section");

    new InputForms($inputSection, {
      getCarName: getCarName.bind(this),
      getTrialCount: getTrialCount.bind(this),
    });
  }

  getCarName(inputs) {
    const newCarNames = inputs.split(",");
    this.setState({
      carNames: [...newCarNames],
    });
  }

  getTrialCount(inputs) {
    this.setState({
      trialCount: inputs,
    });
  }
}
