import Component from "./core/component.js";
import CarNameForm from "./components/CarNameForm.js";
import CarRace from "./components/CarRace.js";
import RaceResult from "./components/RaceResult.js";
import TimeForm from "./components/TimeForm.js";
import {
  APP_SELECTORS,
  WIN_MESSAGE,
  ALERT_DELAY_TIME,
} from "./constants/index.js";
import { $ } from "./utils/dom.js";

let timer;

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
    this.mount();
  }

  mountChildren() {
    const $carNameForm = $(APP_SELECTORS.CAR_FORM);
    const $timeForm = $(APP_SELECTORS.TIME_FORM);
    const $carRace = $(APP_SELECTORS.CAR_RACE);
    const $result = $(APP_SELECTORS.RESULT);

    this.children = {
      CarNameForm: new CarNameForm($carNameForm, this.state, {
        onSubmit: this.handleCarNameSubmit,
      }),
      TimeForm: new TimeForm(
        $timeForm,
        { isTimeFormOpen: this.state.isTimeFormOpen },
        {
          onSubmit: this.handleTimeSubmit,
        }
      ),
      CarRace: new CarRace($carRace, this.state, {
        onGetResult: this.handleGetResult,
      }),
      RaceResult: new RaceResult($result, this.state, {
        onClickInit: this.handleClickInit,
      }),
    };

    for (const component in this.children) {
      this.children[component].render();
    }
  }

  mount() {
    if (timer) clearTimeout(timer);
    if (this.state.isEnded) {
      timer = setTimeout(() => alert(WIN_MESSAGE), ALERT_DELAY_TIME);
    }
  }

  handleCarNameSubmit = (cars) => {
    this.setState({ ...this.state, cars, isTimeFormOpen: true });
  };
  handleTimeSubmit = (time) => {
    this.setState({ ...this.state, time, isStarted: true });
  };

  handleGetResult = (carInfos) => {
    const maxStep = Math.max(...carInfos.map((info) => info.step));
    const winners = carInfos
      .filter((car) => car.step === maxStep)
      .map((car) => car.name);
    this.setState({ ...this.state, winners, isEnded: true });
  };

  handleClickInit = () => {
    this.setState(initialState);
  };
}

export default App;
