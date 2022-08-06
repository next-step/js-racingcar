import MatchNumber from "./state/MatchNumber.js";
import RacingCarInfo from "./state/RacingCarInfo.js";
import RunRacingRenderer from "./RunRacingRenderer.js";
import MatchLoadingView from "./MatchLoadingView.js";
import View from "./View.js";

class PrepareRacingRenderer {
  static MIN_CARNAME_SIZE = 1;
  static MAX_CARNAME_SIZE = 5;
  #prepareRacingView = null;
  #contestantView = null;

  constructor(prepareRacingView, contestantView) {
    this.initRenderer();
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

  testCarNameSize(carName) {
    return (
      PrepareRacingRenderer.MIN_CARNAME_SIZE <= carName.trim().length &&
      carName.trim().length <= PrepareRacingRenderer.MAX_CARNAME_SIZE
    );
  }

  submitCarNames(e) {
    if (!e.target[1].value) {
      return;
    }
    const carNames = e.target[1].value.split(",");
    const invalidCarName = carNames.find((v) => !this.testCarNameSize(v));
    if (invalidCarName) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingCarInfo.setRaceParticipateCar(carNames);
    this.#prepareRacingView.initView();
  }

  submitNumberOfRaces(e) {
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);
    this.#contestantView.initView();
    const runRacingRenderer = new RunRacingRenderer(new MatchLoadingView());
    runRacingRenderer.initRenderer();
  }

  prepareGame = (e) => {
    e.preventDefault();
    this.#prepareRacingView.setElement(e);
    if (e.submitter.id == "car-name-btn") {
      this.submitCarNames(e);
    } else {
      this.submitNumberOfRaces(e);
    }
  };

  initRenderer() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default PrepareRacingRenderer;
