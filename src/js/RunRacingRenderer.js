import ResultRacingView from "./ResultRacingView.js";
import ResultRacingRenderer from "./ResultRacingRenderer.js";
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

  finishOneMatch() {
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
    return new Promise((resolve, reject) => {
      let count = 1;
      this.matchLoading();
      const timeoutId = setInterval(() => {
        this.finishOneMatch();
        if (count++ === MatchNumber.getMatchNumber()) {
          clearInterval(timeoutId);
          resolve();
          return;
        }
        this.matchLoading();
      }, 1000);
    });
  }

  async initRenderer() {
    await this.matchProgress();
    const resultRacingRenderer = new ResultRacingRenderer(
      new ResultRacingView()
    );
    resultRacingRenderer.initRenderer();
  }
}
export default RunRacingRenderer;
