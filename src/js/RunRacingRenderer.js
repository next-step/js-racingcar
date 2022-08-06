import MatchNumber from "./state/MatchNumber.js";
import RacingCarInfo from "./state/RacingCarInfo.js";

class RunRacingRenderer {
  static MAX_RANDOM_NUM = 9;
  static MIN_RANDOM_NUM = 0;
  static MIN_PLAY_NUM = 4;
  #runRacingView = null;

  constructor(runRacingView) {
    this.#runRacingView = runRacingView;
  }

  set runRacingView(v) {
    if (v instanceof View) this.#runRacingView = v;
    else throw `invalid vie : ${v}`;
  }

  randomNumberGenerator() {
    return Math.floor(
      Math.random() * RunRacingRenderer.MAX_RANDOM_NUM +
        RunRacingRenderer.MIN_RANDOM_NUM
    );
  }

  decidePlay() {
    return this.randomNumberGenerator() >= RunRacingRenderer.MIN_PLAY_NUM;
  }

  matchLoading() {
    RacingCarInfo.getRaceParticipateCar().forEach((element) => {
      this.#runRacingView.setElement(element);
      this.#runRacingView.initView();
    });
  }

  matchResult() {
    //view
    RacingCarInfo.getRaceParticipateCar().forEach((element) => {
      this.#runRacingView.setElement(element);
      this.#runRacingView.finishLoadingRacingView();
      if (!this.decidePlay()) return;
      this.#runRacingView.movesForwardView();
      RacingCarInfo.setRaceForwardCount(element);
    });
  }

  matchProgress() {
    let count = 1;
    this.matchLoading();
    const timeoutId = setInterval(() => {
      this.matchResult();
      if (count++ === MatchNumber.getMatchNumber()) {
        clearInterval(timeoutId);
        return;
      }
      this.matchLoading();
    }, 1000);
  }

  initRenderer() {
    this.matchProgress();
  }
}
export default RunRacingRenderer;
