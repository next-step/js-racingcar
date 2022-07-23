class RacingCar {
  raceParticipateCar;
  constructor() {
    this.initEventListeners();
  }

  testCarNameSize = (carName) => {
    return carName.length <= 5;
  };

  gamePrepation = (e) => {
    e.preventDefault();
    console.log("e.submiter23", e.submitter);
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
      const template = this.raceParticipateCar
        .map((raceCar) => {
          return `
        <div class="mr-2">
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
    }
  };

  initEventListeners = () => {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.gamePrepation);
  };
}
export default RacingCar;
