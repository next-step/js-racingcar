import PrepareRacingDomain from "./PrepareRacingDomian.js";
import InputNumberOfMatchesView from "../InputNumberOfMatchesView.js";
import ContestantView from "../ContestantView.js";
import RunRacingDomain from "./RunRacingDomain.js";
import RunRacingView from "../RunRacingView.js";
import ResultRacingView from "../ResultRacingView.js";
import ResultRacingRenderer from "../ResultRacingRenderer.js";
class MainDomain {
  constructor() {
    this.initEventListener();
  }

  prepareGame = async (e) => {
    e.preventDefault();
    const prePareRacingDomain = new PrepareRacingDomain(
      new InputNumberOfMatchesView(),
      new ContestantView()
    );
    if (e.submitter.id == "car-name-btn") {
      prePareRacingDomain.submitCarNames(e);
    } else {
      prePareRacingDomain.submitNumberOfMatches(e);
      const runRacingDomain = new RunRacingDomain(new RunRacingView());
      await runRacingDomain.initRenderer();
      const resultRacingRenderer = new ResultRacingRenderer(
        new ResultRacingView()
      );
      resultRacingRenderer.initRenderer();
    }
  };

  initEventListener() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default MainDomain;
