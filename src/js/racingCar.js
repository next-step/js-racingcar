class RacingCar {
  static MAX_RANDOM_NUM = 9;
  static MIN_RANDOM_NUM = 0;
  static MIN_CARNAME_SIZE = 1;
  static MAX_CARNAME_SIZE = 5;
  static MIN_PLAY_NUM = 4;

  raceParticipateCar;
  raceCount;

  constructor() {
    this.initEventListeners();
  }

  randomNumberGenerator() {
    return Math.floor(
      Math.random() * RacingCar.MAX_RANDOM_NUM + RacingCar.MIN_RANDOM_NUM
    );
  }

  decidePlay() {
    return this.randomNumberGenerator() >= RacingCar.MIN_PLAY_NUM;
  }

  testCarNameSize(carName) {
    return (
      RacingCar.MIN_CARNAME_SIZE <= carName.trim().length &&
      carName.trim().length <= RacingCar.MAX_CARNAME_SIZE
    );
  }

  participateCarTemplate(raceCarName) {
    return `
    <div class="mr-2" data-racecar-name="${raceCarName}">
      <div class="car-player">${raceCarName}</div>
    </div>`;
  }

  participateCarTemplateGenerator() {
    return this.raceParticipateCar
      .map((raceCar) => this.participateCarTemplate(raceCar))
      .join("");
  }

  openInputNumberOfMatches(e) {
    e.target.insertAdjacentHTML(
      "beforeend",
      `<fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" id="try-count-input" class="w-100 mr-2" placeholder="시도 횟수" />
          <button id="try-count-btn" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>`
    );
  }

  matchLoading() {
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
  }

  matchResult() {
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
  }

  matchFormGenerator() {
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
      if (count++ === this.raceCount) {
        clearInterval(timeoutId);
        return;
      }
      this.matchLoading();
    }, 1000);
  }

  submitCarNames(e) {
    if (!e.target[1].value) {
      return;
    }
    this.raceParticipateCar = e.target[1].value.split(",");
    this.raceParticipateCar.forEach((element) => {
      if (!this.testCarNameSize(element)) {
        alert("5자 이하의 자동차 이름을 입력하세요.");
        return;
      }
    });
    this.openInputNumberOfMatches(e);
  }

  submitNumberOfRaces(e) {
    this.raceCount = e.target[4].valueAsNumber;
    this.matchFormGenerator();
    this.matchProgress();
  }

  gamePrepation = (e) => {
    e.preventDefault();
    if (e.submitter.id == "car-name-btn") {
      this.submitCarNames(e);
    } else {
      this.submitNumberOfRaces(e);
    }
  };

  initEventListeners() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.gamePrepation);
  }
}
export default RacingCar;
