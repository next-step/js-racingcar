import Component from "./core/component.js";
import CarNameForm from "./components/CarNameForm.js";
import CarRace from "./components/CarRace.js";
import RaceResult from "./components/RaceResult.js";
import TimeForm from "./components/TimeForm.js";
import { $ } from "./utils/dom.js";

const initialState = {
  cars: [],
  winners: [],
  time: 0,
  isStarted: false,
  isEnded: false,
  isTimeFormOpen: false,
};

class App extends Component {
  constructor($root) {
    super();
    this.$root = $root;
    this.state = initialState;
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
    const $carRace = $("#car-race");
    const $result = $("#result");

    this.children = {
      CarNameForm: new CarNameForm($carNameForm, this.state, {
        onSubmit: this.handleCarNameSubmit.bind(this),
      }),
      TimeForm: new TimeForm(
        $timeForm,
        { isTimeFormOpen: this.state.isTimeFormOpen },
        {
          onSubmit: this.handleTimeSubmit.bind(this),
        }
      ),
      CarRace: new CarRace($carRace, this.state, {
        onGetResult: this.handleGetResult.bind(this),
      }),
      RaceResult: new RaceResult($result, this.state, {
        onClickInit: this.handleClickInit.bind(this),
      }),
    };

    for (const component in this.children) {
      this.children[component].render();
    }
  }

  handleCarNameSubmit(cars) {
    const nextState = { ...this.state, cars, isTimeFormOpen: true };
    this.setState(nextState);
  }
  handleTimeSubmit(time) {
    const nextState = { ...this.state, time, isStarted: true };
    this.setState(nextState);
  }

  handleGetResult(carInfos) {
    const maxStep = [...carInfos].sort((a, b) => b.step - a.step)[0].step;
    const winners = carInfos
      .filter((car) => car.step === maxStep)
      .map((car) => car.name);
    this.setState({ ...this.state, winners, isEnded: true });
  }

  handleClickInit() {
    this.setState(initialState);
  }
}

export default App;
