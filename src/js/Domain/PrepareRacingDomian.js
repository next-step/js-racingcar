import RacingInfoDomain from "./RacingInfoDomain.js";
import View from "../View.js";
import MatchNumber from "../state/MatchNumber.js";
class PrepareRacingDomain {
  #prepareRacingView;
  #contestantView;

  constructor(prepareRacingView, contestantView) {
    this.#prepareRacingView = prepareRacingView;
    this.#contestantView = contestantView;
  }

  set prepareRacingView(v) {
    if (v instanceof View) this.#prepareRacingView = v;
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
    this.#prepareRacingView.setElement(e);
    if (RacingInfoDomain.findInvalidCar(carNames.split(","))) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingInfoDomain.setRaceParticipateCar(carNames.split(","));
    this.#prepareRacingView.initView();
  }

  submitNumberOfRaces(e) {
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);
    this.#contestantView.initView();
  }
}
export default PrepareRacingDomain;
