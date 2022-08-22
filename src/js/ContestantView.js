import View from "./View.js";
import RacingInfoDomain from "./Domain/RacingInfoDomain.js";

class ContestantView extends View {
  setElement() {}

  initView() {
    document.querySelector("#app").insertAdjacentHTML(
      "beforeend",
      `<section class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
          ${this.participateCarTemplateGenerator()}
        </div>
      </section>`
    );
  }

  participateCarTemplate(raceCarName) {
    //view
    return `
    <div class="mr-2" data-racecar-name="${raceCarName}">
      <div class="car-player">${raceCarName}</div>
    </div>`;
  }

  participateCarTemplateGenerator() {
    return RacingInfoDomain.getRaceParticipateCar()
      .map((raceCar) => this.participateCarTemplate(raceCar))
      .join("");
  }
}
export default ContestantView;
