import RacingCarInfoDomain from "./RacingCarInfoDomain.js";
import View from "../View.js";

class PrepareRacingDomain {
  #prepareRacingView;

  constructor(prepareRacingView) {
    this.#prepareRacingView = prepareRacingView;
  }

  set prepareRacingView(v) {
    if (v instanceof View) this.#prepareRacingView = v;
    else throw `invalid vie : ${v}`;
  }

  submitCarNames(e) {
    const carNames = e.target[1].value;
    if (!carNames) {
      return;
    }
    this.#prepareRacingView.setElement(e);
    if (RacingCarInfoDomain.findInvalidCar(carNames.split(","))) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingCarInfoDomain.setRaceParticipateCar(carNames.split(","));
    this.#prepareRacingView.initView();
  }
}
export default PrepareRacingDomain;
