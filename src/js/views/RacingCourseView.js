import View from "./@common/View.js";
import { CLASS_NAME } from "../constants/selectors.js";
import { removeChildrenAll } from "../utils/dom.js";
import racingCarGameStore from "../stores/RacingCarGameStore.js";

class RacingCourseView extends View {
  init() {
    this.render();
    this.hide();

    racingCarGameStore.subscribeState("carNames", this.renderTracks.bind(this));
  }

  render() {
    super.render(`
      <div class="${CLASS_NAME.RACING_TRACK_CONTAINER} mt-4 d-flex"></div>
    `);
  }

  renderTracks(state) {
    const { carNames } = state;
    const $trackContainer = this.$container.querySelector(`.${CLASS_NAME.RACING_TRACK_CONTAINER}`);

    removeChildrenAll($trackContainer);
    $trackContainer.insertAdjacentHTML(
      "afterbegin",
      carNames
        .map(
          (name) => `
          <div class="js-racing-track mr-2" data-car-name="${name}">
            <div class="js-car-player car-player">${name}</div>
          </div>
        `
        )
        .join("")
    );
  }
}

export default RacingCourseView;
