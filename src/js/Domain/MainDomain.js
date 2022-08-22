import PrepareRacingDomain from "./PrepareRacingDomian.js";
import InputNumberOfMatchesView from "../InputNumberOfMatchesView.js";
import ContestantView from "../ContestantView.js";
import RunRacingRenderer from "../RunRacingRenderer.js";
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
      const runRacingRenderer = new RunRacingRenderer(new RunRacingView());
      await runRacingRenderer.initRenderer();
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
