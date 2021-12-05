import { ClassName } from "../common/constants";
import { delay, getRandom } from "../common/utils";
import { $$, class2Query } from "../common/dom";
import Component from "../core/Component";
import { Car, CarProps } from "./Car";

interface GameProcessState {
  carProps?: CarProps[];
  raceTimes?: number;
}

const defaultState: GameProcessState = {
  carProps: [],
  raceTimes: 0,
};
export default class GameProcess extends Component<{}, GameProcessState> {
  constructor($target: HTMLElement) {
    super($target, {}, defaultState);
  }

  reset() {
    this.setState(defaultState);
  }

  setState(nextState: GameProcessState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  async executeTask(duration: number) {
    const loadingProps = this.state!.carProps!.map((carProp) => ({
      ...carProp,
      isForwarding: true,
    }));
    this.setState({ carProps: loadingProps });

    await delay(duration);

    const forwardProps: CarProps[] = this.state!.carProps!.map((carProp) => {
      carProp.isForwarding = false;
      if (this.canMove()) {
        carProp.forwardedCnt++;
      }
      return carProp;
    });
    this.setState({ carProps: forwardProps });
  }

  private canMove(): boolean {
    return getRandom(0, 9) >= 4;
  }

  async playGame(interval: number) {
    for (let i = 0; i < this.state!.raceTimes!; i++) {
      await this.executeTask(interval);
    }
    const maxForwardedCnt = Math.max(
      ...this.state!.carProps!.map((prop) => prop.forwardedCnt)
    );
    return this.state!.carProps!.filter(
      (prop) => prop.forwardedCnt === maxForwardedCnt
    ).map((prop) => prop.name);
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

    const carsHTML = this.state!.carProps!.map(
      (_, idx) => `<div data-id="${idx}" class="${ClassName.Car} mr-2"></div>`
    ).join("");

    return `
        <div class="mt-4 d-flex game-play">
          ${carsHTML}
        </div>
    `;
  }

  componentDidUpdate() {
    $$(class2Query(ClassName.Car), this.$target).forEach(($car) => {
      const idx: number = +$car.dataset.id!;
      const carProps = this.state!.carProps![idx] as CarProps;
      new Car($car, carProps);
    });
  }
}
