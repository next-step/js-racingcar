import MatchNumber from "./state/MatchNumber.js";
import RacingCarInfo from "./state/RacingCarInfo.js";

class RunRacingRenderer {
  static MAX_RANDOM_NUM = 9;
  static MIN_RANDOM_NUM = 0;
  static MIN_PLAY_NUM = 4;

  constructor() {}

  randomNumberGenerator() {
    return Math.floor(
      Math.random() * RunRacingRenderer.MAX_RANDOM_NUM +
        RunRacingRenderer.MIN_RANDOM_NUM
    );
  }

  decidePlay() {
    return this.randomNumberGenerator() >= RunRacingRenderer.MIN_PLAY_NUM;
  }

  participateCarTemplate(raceCarName) {
    //view
    return `
    <div class="mr-2" data-racecar-name="${raceCarName}">
      <div class="car-player">${raceCarName}</div>
    </div>`;
  }

  participateCarTemplateGenerator() {
    return RacingCarInfo.getRaceParticipateCar()
      .map((raceCar) => this.participateCarTemplate(raceCar))
      .join("");
  }

  matchLoading() {
    //view
    console.log("matchloading", RacingCarInfo.getRaceParticipateCar());
    console.log("first", document.querySelector(`div[data-racecar-name="1"]`));
    RacingCarInfo.getRaceParticipateCar().forEach((element) => {
      document
        .querySelector(`div[data-racecar-name="${element}"]`)
        .insertAdjacentHTML(
          "beforeend",
          `<div class="d-flex justify-center mt-3" data-race-loading="${element}">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>`
        );
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

  matchFormGenerator() {
    //view
    document.querySelector("#app").insertAdjacentHTML(
      "beforeend",
      `<section class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
          ${this.participateCarTemplateGenerator()}
        </div>
      </section>`
    );
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
    this.matchFormGenerator();
    this.matchProgress();
  }
}
export default RunRacingRenderer;
