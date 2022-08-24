import RacingInfoDomain from "./RacingInfoDomain.js";
import Renderer from "../Renderer/Renderer.js";
class PrepareRacingDomain {
  #inputNumberOfMatchesRenderer;
  #contestantRenderer;

  constructor(inputNumberOfMatchesRenderer, contestantRenderer) {
    this.#inputNumberOfMatchesRenderer = inputNumberOfMatchesRenderer;
    this.#contestantRenderer = contestantRenderer;
  }

  set inputNumberOfMatchesRenderer(v) {
    if (v instanceof Renderer) this.#inputNumberOfMatchesRenderer = v;
    else throw `invalid vie : ${v}`;
  }

  set contestantRenderer(v) {
    if (v instanceof Renderer) this.#contestantRenderer = v;
    else throw `invalid vie : ${v}`;
  }

  submitCarNames(e) {
    const carNames = e.target[1].value;
    if (!carNames) {
      return;
    }
    this.#inputNumberOfMatchesRenderer.setElement(e);
    if (RacingInfoDomain.findInvalidCar(carNames.split(","))) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingInfoDomain.setRaceParticipateCar(carNames.split(","));
    this.#inputNumberOfMatchesRenderer.initRenderer();
  }

  submitNumberOfMatches(e) {
    RacingInfoDomain.setMatchNumber(e.target[4].valueAsNumber);
    this.#contestantRenderer.initRenderer();
  }
}
export default PrepareRacingDomain;
