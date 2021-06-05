import Component from "../core/component.js";
import { LOADER_ID, WIN_NUMBER } from "../constants/index.js";
import {
  headerTemplate,
  forwardTemplate,
  loaderTemplate,
} from "../templates/Car.js";
import { getRandomNumber } from "../utils/getRandomNumber.js";

class Car extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;

    this.state = {
      step: 0,
      isMoved: false,
      isStopped: false,
    };
  }

  setState(nextState) {
    this.state = nextState;
    this.mount();
  }

  init() {
    this.$root.innerHTML = headerTemplate(this.props.name);
  }

  mount() {
    const lastChild = this.$root.lastChild;
    if (lastChild.id === LOADER_ID) {
      this.$root.removeChild(lastChild);
    }
    if (this.state.isStopped) return;
    if (this.state.isMoved) {
      const $forward = forwardTemplate(this.state.step);
      this.$root.appendChild($forward);
    }
    const $loader = loaderTemplate(this.state.step);
    this.$root.appendChild($loader);
  }

  handleRace(isArrived) {
    const random = getRandomNumber();
    if (random < WIN_NUMBER) {
      this.setState({
        ...this.state,
        isMoved: false,
      });
    } else {
      this.setState({
        ...this.state,
        step: this.state.step + 1,
        isMoved: true,
      });
    }
    if (isArrived) {
      this.handlers.onArrive(this.props.name, this.state.step);
      this.setState({ ...this.state, isStopped: true });
    }
  }
}

export default Car;
