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
    //경기 참가 자동차명을 입력하면, 자동차명이 규칙에 맞는지 확인한 후, 경기횟수를 입력하는 폼을 열어준다.
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
    //경기횟수를 입력하면 그에 해당하는 template을 생성하고 경기를 진행한다.
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);

    const runRacingRenderer = new RunRacingRenderer();
    runRacingRenderer.initRenderer();
  }

  prepareGame = (e) => {
    //자동차이름과 경기회수 입력 이벤트를 판단한다.
    e.preventDefault();
    this.#view.setElement(e);
    if (e.submitter.id == "car-name-btn") {
      this.submitCarNames(e);
    } else {
      this.submitNumberOfRaces(e);
    }
  };

  initRenderer() {
    //입력 폼을 가져온다.
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default PrepareRacingRenderer;
