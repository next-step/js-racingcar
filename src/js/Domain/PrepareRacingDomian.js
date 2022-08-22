import RacingInfoDomain from "./RacingInfoDomain.js";
import View from "../View.js";
class PrepareRacingDomain {
  #inputNumberOfMatchesView;
  #contestantView;

  constructor(inputNumberOfMatchesView, contestantView) {
    this.#inputNumberOfMatchesView = inputNumberOfMatchesView;
    this.#contestantView = contestantView;
  }

  set inputNumberOfMatchesView(v) {
    if (v instanceof View) this.#inputNumberOfMatchesView = v;
    else throw `invalid vie : ${v}`;
  }

  set contestantView(v) {
    if (v instanceof View) this.#contestantView = v;
    else throw `invalid vie : ${v}`;
  }

  submitCarNames(e) {
    const carNames = e.target[1].value;
    if (!carNames) {
      return;
    }
    this.#inputNumberOfMatchesView.setElement(e);
    if (RacingInfoDomain.findInvalidCar(carNames.split(","))) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingInfoDomain.setRaceParticipateCar(carNames.split(","));
    this.#inputNumberOfMatchesView.initView();
  }

  submitNumberOfMatches(e) {
    RacingInfoDomain.setMatchNumber(e.target[4].valueAsNumber);
    this.#contestantView.initView();
  }
}
export default PrepareRacingDomain;
