import RacingInfoDomain from "./RacingInfoDomain.js";

class RunRacingDomain {
  static MAX_RANDOM_NUM = 9;
  static MIN_RANDOM_NUM = 0;
  static MIN_PLAY_NUM = 4;
  #runRacingRenderer = null;

  constructor(runRacingRenderer) {
    this.#runRacingRenderer = runRacingRenderer;
  }

  set runRacingRenderer(v) {
    if (v instanceof Renderer) this.#runRacingRenderer = v;
    else throw `invalid vie : ${v}`;
  }

  randomNumberGenerator() {
    return Math.floor(
      Math.random() * RunRacingDomain.MAX_RANDOM_NUM +
        RunRacingDomain.MIN_RANDOM_NUM
    );
  }

  decidePlay() {
    return this.randomNumberGenerator() >= RunRacingDomain.MIN_PLAY_NUM;
  }

  matchLoading() {
    RacingInfoDomain.getRaceParticipateCar().forEach((element) => {
      this.#runRacingRenderer.setElement(element);
      this.#runRacingRenderer.initRenderer();
    });
  }

  finishOneMatch() {
    RacingInfoDomain.getRaceParticipateCar().forEach((element) => {
      this.#runRacingRenderer.setElement(element);
      this.#runRacingRenderer.finishLoadingRacingRenderer();
      if (!this.decidePlay()) return;
      this.#runRacingRenderer.movesForwardRenderer();
      RacingInfoDomain.setRaceForwardCount(element);
    });
  }

  matchProgress() {
    return new Promise((resolve, reject) => {
      let count = 1;
      this.matchLoading();
      const timeoutId = setInterval(() => {
        this.finishOneMatch();
        if (count++ === RacingInfoDomain.getMatchNumber()) {
          clearInterval(timeoutId);
          resolve();
          return;
        }
        this.matchLoading();
      }, 1000);
    });
  }
}
export default RunRacingDomain;
