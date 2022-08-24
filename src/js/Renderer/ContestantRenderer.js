import Renderer from "./Renderer.js";
import RacingInfoDomain from "../Domain/RacingInfoDomain.js";

class ContestantRenderer extends Renderer {
  setElement() {}

  initRenderer() {
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
export default ContestantRenderer;
