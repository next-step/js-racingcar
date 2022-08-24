import PrepareRacingDomain from "./PrepareRacingDomian.js";
import InputNumberOfMatchesRenderer from "../Renderer/InputNumberOfMatchesRenderer.js";
import ContestantRenderer from "../Renderer/ContestantRenderer.js";
import RunRacingDomain from "./RunRacingDomain.js";
import RunRacingRenderer from "../Renderer/RunRacingRenderer.js";
import ResultRacingRenderer from "../Renderer/ResultRacingRenderer.js";
import ResultRacingDomain from "./ResultRacingDomain.js";

class MainDomain {
  constructor() {
    this.initEventListener();
  }

  submitCarNames(prePareRacingDomain, e) {
    prePareRacingDomain.submitCarNames(e);
  }

  async submitNumberOfMatches(prePareRacingDomain, e) {
    const runRacingDomain = new RunRacingDomain(new RunRacingRenderer());
    const resultRacingDomain = new ResultRacingDomain(
      new ResultRacingRenderer()
    );

    prePareRacingDomain.submitNumberOfMatches(e);
    await runRacingDomain.matchProgress();
    resultRacingDomain.resultRacing();
  }

  initGame = (e) => {
    e.preventDefault();
    const prePareRacingDomain = new PrepareRacingDomain(
      new InputNumberOfMatchesRenderer(),
      new ContestantRenderer()
    );
    if (e.submitter.id == "car-name-btn") {
      this.submitCarNames(prePareRacingDomain, e);
    } else {
      this.submitNumberOfMatches(prePareRacingDomain, e);
    }
  };

  initEventListener() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.initGame);
  }
}
export default MainDomain;
