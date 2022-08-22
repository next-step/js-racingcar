import MatchNumber from "../state/MatchNumber.js";
import PrepareRacingDomain from "./PrepareRacingDomian.js";
import PrepareRacingView from "../PrepareRacingView.js";
import RunRacingRenderer from "../RunRacingRenderer.js";
import RunRacingView from "../RunRacingView.js";
import View from "../View.js";

class MainDomain {
  #contestantView;

  constructor(contestantView) {
    this.initEventListener();
    this.#contestantView = contestantView;
  }

  set contestantView(v) {
    if (v instanceof View) this.#contestantView = v;
    else throw `invalid vie : ${v}`;
  }

  submitNumberOfRaces(e) {
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);
    this.#contestantView.initView();
    const runRacingRenderer = new RunRacingRenderer(new RunRacingView());
    runRacingRenderer.initRenderer();
  }

  prepareGame = (e) => {
    e.preventDefault();
    if (e.submitter.id == "car-name-btn") {
      const prePareRacingDomain = new PrepareRacingDomain(
        new PrepareRacingView()
      );
      prePareRacingDomain.submitCarNames(e);
    } else {
      this.submitNumberOfRaces(e);
    }
  };

  initEventListener() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default MainDomain;
