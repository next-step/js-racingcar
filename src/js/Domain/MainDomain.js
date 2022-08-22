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

  prepareGame = async (e) => {
    e.preventDefault();
    const prePareRacingDomain = new PrepareRacingDomain(
      new InputNumberOfMatchesRenderer(),
      new ContestantRenderer()
    );
    if (e.submitter.id == "car-name-btn") {
      prePareRacingDomain.submitCarNames(e);
    } else {
      prePareRacingDomain.submitNumberOfMatches(e);
      const runRacingDomain = new RunRacingDomain(new RunRacingRenderer());
      await runRacingDomain.initRenderer();
      const resultRacingDomain = new ResultRacingDomain(
        new ResultRacingRenderer()
      );
      resultRacingDomain.initRenderer();
    }
  };

  initEventListener() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default MainDomain;
