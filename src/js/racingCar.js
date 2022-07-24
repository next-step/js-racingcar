import { MAX_RANDOM_NUM, MIN_RANDOM_NUM } from "../utils/constant.js";
class RacingCar {
  raceParticipateCar;
  raceCount;
  constructor() {
    this.initEventListeners();
  }

  randomNumberGenerator = () => {
    return Math.floor(Math.random() * MAX_RANDOM_NUM + MIN_RANDOM_NUM);
  };

  decidePlay = () => {
    return this.randomNumberGenerator() >= 4;
  };

  testCarNameSize = (carName) => {
    return 0 < carName.length && carName.length <= 5;
  };

  matchLoading = () => {
    this.raceParticipateCar.forEach((element) => {
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
  };

  matchResult = () => {
    this.raceParticipateCar.forEach((element) => {
      document.querySelector(`div[data-race-loading="${element}"]`).remove();
      if (!this.decidePlay()) return;
      document
        .querySelector(`div[data-racecar-name="${element}"]`)
        .insertAdjacentHTML(
          "beforeend",
          `<div class="forward-icon mt-2">⬇️️</div>`
        );
    });
  };
  matchProgress = () => {
    let count = 1;
    this.matchLoading();
    const timeoutId = setInterval(() => {
      this.matchResult();
      if (count++ === this.raceCount) {
        clearInterval(timeoutId);
        return;
      }
      this.matchLoading();
    }, 1000);
  };

  gamePrepation = (e) => {
    e.preventDefault();
    if (e.submitter.id == "car-name") {
      if (!e.target[1].value) {
        return;
      }
      this.raceParticipateCar = e.target[1].value.split(",");
      this.raceParticipateCar.forEach((element) => {
        if (!this.testCarNameSize(element)) {
          alert("5자 이하의 자동차 이름을 입력하세요");
          return;
        }
      });

      e.target.insertAdjacentHTML(
        "beforeend",
        `<fieldset>
          <p>시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
            <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
            <button id="try-count" class="btn btn-cyan">확인</button>
          </div>
        </fieldset>`
      );
    } else {
      this.raceCount = e.target[4].valueAsNumber;
      const template = this.raceParticipateCar
        .map((raceCar) => {
          return `
        <div class="mr-2" data-racecar-name="${raceCar}">
          <div class="car-player">${raceCar}</div>
        </div>`;
        })
        .join("");

      document.querySelector("#app").insertAdjacentHTML(
        "beforeend",
        `<section class="d-flex justify-center mt-5">
          <div class="mt-4 d-flex">
            ${template}
          </div>
        </section>`
      );
      this.matchProgress();
    }
  };

  initEventListeners = () => {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.gamePrepation);
  };
}
export default RacingCar;
