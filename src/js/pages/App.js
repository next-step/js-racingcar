import Component from "../lib/Component.js";
import InputForm from "./InputForm.js";
import Racing from "./Racing.js";
import Winner from "./Winner.js";

export default class App extends Component {
  setup() {
    this.state = {
      step: 1,
      cars: [],
      tryAmount: '',
      winners: []
    }
    this.changeStep = this.changeStep.bind(this);
  }

  changeStep(context) {
    this.setState(context);
  }

  template() {
    return `
      <section id="inputContainer" class="d-flex justify-center mt-5"></section>
      <section id="racing" class="d-flex justify-center mt-5"></section>
      <section id="winner" class="d-flex justify-center mt-5"></section>`;
  }

  mounted() {
    const {step, cars, tryAmount, winners} = this.state;
    const props = {
      changeStep: this.changeStep,
      step,
      cars,
      tryAmount,
      winners
    }
    new InputForm('#inputContainer', {...props});
    new Racing('#racing', {...props});
    new Winner('#winner', {...props});
  }
}