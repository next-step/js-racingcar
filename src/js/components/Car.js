import Component from "../core/component.js";

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
    this.$root.innerHTML = `<div class="car-player">${this.props.name}</div>`;
  }

  mount() {
    const lastChild = this.$root.lastChild;
    if (lastChild.id === "loader") {
      this.$root.removeChild(lastChild);
    }
    if (this.state.isStopped) return;
    if (this.state.isMoved) {
      const $container = document.createElement("div");
      $container.className = "forward-icon mt-2";
      $container.innerText = "⬇️";
      this.$root.appendChild($container);
    } else {
      const $container = document.createElement("div");
      $container.id = "loader";
      $container.className = "d-flex justify-center mt-3";
      $container.innerHTML = `
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>`;
      this.$root.appendChild($container);
    }
  }

  handleRace(isArrived) {
    const random = Math.floor(Math.random() * 10);
    if (random < 4) {
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
