import MatchNumber from "./state/MatchNumber.js";
import RacingCarInfo from "./state/RacingCarInfo.js";
import RunRacingRenderer from "./RunRacingRenderer.js";
import View from "./View.js";

class PrepareRacingRenderer {
  static MIN_CARNAME_SIZE = 1;
  static MAX_CARNAME_SIZE = 5;
  #view = null;

  constructor(view) {
    this.initRenderer();
    this.#view = view;
  }

  set view(v) {
    if (v instanceof View) this.#view = v;
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
    this.#view.initView();
  }

  submitNumberOfRaces(e) {
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);
    const runRacingRenderer = new RunRacingRenderer();
    runRacingRenderer.initRenderer();
  }

  prepareGame = (e) => {
    e.preventDefault();
    this.#view.setElement(e);
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
