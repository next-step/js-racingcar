import Component from "./core/component.js";
import CarNameForm from "./components/CarNameForm.js";
import TimeForm from "./components/TimeForm.js";
import RaceResult from "./components/RaceResult.js";
import { $ } from "./utils/dom.js";

class App extends Component {
  constructor($root) {
    super();
    this.$root = $root;
    this.state = {
      cars: [],
      times: 0,
      isStart: false,
      isTimeFormOpen: false,
    };
  }

  setState(nextState) {
    this.state = nextState;
    for (const component in this.children) {
      this.children[component].updateProps(this.state);
    }
  }

  mountChildren() {
    const $carNameForm = $("#car-form");
    const $timeForm = $("#time-form");
    const $raceResult = $("#result");

    this.children = {
      CarNameForm: new CarNameForm($carNameForm, {
        onSubmit: this.handleCarNameSubmit.bind(this),
      }),
      TimeForm: new TimeForm(
        $timeForm,
        { isTimeFormOpen: this.state.isTimeFormOpen },
        {
          onSubmit: this.handleTimeSubmit.bind(this),
        }
      ),
      RaceResult: new RaceResult($raceResult, this.state, {
        onClickInit: this.handleClickInit.bind(this),
      }),
    };

    for (const component in this.children) {
      this.children[component].render();
    }
  }

  handleCarNameSubmit(carNames) {
    const nextState = { ...this.state, carNames, isTimeFormOpen: true };
    this.setState(nextState);
  }
  handleTimeSubmit(times) {
    const nextState = { ...this.state, times, isStart: true };
    this.setState(nextState);
  }
  handleClickInit() {}
}

export default App;
