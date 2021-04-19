import { ClassName } from "../common/constants";
import { class2Query, delay } from "../common/utils";
import Component from "../core/Component";
import { Car, CarProps } from "./Car";

interface GameProcessState {
  carProps?: CarProps[];
  raceTimes?: number;
}
export default class GameProcess extends Component {
  private state?: GameProcessState;
  constructor($target: HTMLElement, props?: Object) {
    super($target, props);
    this.state = { carProps: [], raceTimes: 0 };
  }

  setState(nextState: GameProcessState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  async playGame() {
    const Interval = 1000;
    const carProps1 = this.state!.carProps!.map((carProp) => {
      carProp.isForwarding = true;
      return carProp;
    });
    this.setState({ carProps: carProps1 });

    await delay(500);

    const carProps2: CarProps[] = this.state!.carProps!.map((carProp) => {
      carProp.forwardedCnt++;
      carProp.isForwarding = false;
      return carProp;
    });
    this.setState({ carProps: carProps2 });
    setTimeout(() => this.playGame(), Interval);
  }

  componentDidMount() {
    const Interval = 1000;
    setTimeout(() => this.playGame(), Interval);
  }

  createDefaultCarProps(carName: string): CarProps {
    return {
      name: carName,
      isForwarding: false,
      forwardedCnt: 0,
    };
  }

  getInnerHTML() {
    if (!this.state) {
      return "";
    }

    const carsHTML = new Array(this.state!.carProps!.length)
      .fill(null)
      .map(
        (_, idx) => `
      <div data-id="${idx}" class="${ClassName.Car} mr-2"></div>`
      )
      .join("");

    return `
        <div class="mt-4 d-flex game-play">
          ${carsHTML}
        </div>
    `;
  }

  componentDidUpdate() {
    const $cars = this.$target.querySelectorAll<HTMLElement>(
      class2Query(ClassName.Car)
    );

    Array.from($cars).forEach(($car) => {
      if (typeof $car.dataset.id === "string") {
        const idx: number = +$car.dataset.id;
        const carProps = this.state!.carProps![idx] as CarProps;
        new Car($car, carProps);
      }
    });
  }
}
