import MatchNumber from "./state/MatchNumber.js";
import RacingCarInfo from "./state/RacingCarInfo.js";

class RunRacingRenderer {
  static MAX_RANDOM_NUM = 9;
  static MIN_RANDOM_NUM = 0;
  static MIN_PLAY_NUM = 4;
  #matchLoadingView = null;

  constructor(matchLoadingView) {
    this.#matchLoadingView = matchLoadingView;
  }

  set matchLoadingView(v) {
    if (v instanceof View) this.#matchLoadingView = v;
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
      this.#matchLoadingView.setElement(element);
      this.#matchLoadingView.initView();
    });
  }

  matchResult() {
    //view
    RacingCarInfo.getRaceParticipateCar().forEach((element) => {
      document.querySelector(`div[data-race-loading="${element}"]`).remove();
      if (!this.decidePlay()) return;
      document
        .querySelector(`div[data-racecar-name="${element}"]`)
        .insertAdjacentHTML(
          "beforeend",
          `<div class="forward-icon mt-2">⬇️️</div>`
        );
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
