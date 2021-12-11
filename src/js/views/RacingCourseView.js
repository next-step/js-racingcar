import View from "./@common/View.js";
import { CLASS_NAME } from "../constants/selectors.js";
import { removeChildrenAll } from "../utils/dom.js";
import racingCarGameStore from "../stores/RacingCarGameStore.js";

class RacingCourseView extends View {
  init() {
    this.render();
    this.hide();

    racingCarGameStore.subscribeState("cars", this.renderTracks.bind(this));
    racingCarGameStore.subscribeState("cars", this.rednerRacingTrace.bind(this));
  }

  render() {
    super.render(`
      <div class="${CLASS_NAME.RACING_TRACK_CONTAINER} mt-4 d-flex"></div>
    `);
  }

  renderTracks(state) {
    const carNames = state.cars.map((car) => car.name);
    const $trackContainer = this.$container.querySelector(`.${CLASS_NAME.RACING_TRACK_CONTAINER}`);

    removeChildrenAll($trackContainer);
    $trackContainer.insertAdjacentHTML(
      "afterbegin",
      carNames
        .map(
          (name) => `
          <div class="${CLASS_NAME.RACING_TRACK} mr-2" data-car-name="${name}">
            <div class="${CLASS_NAME.CAR_PLAYER} car-player">${name}</div>
          </div>
        `
        )
        .join("")
    );
  }

  rednerRacingTrace(state) {
    const { cars } = state;

    cars.forEach((car) => {
      const $track = this.$container.querySelector(`.${CLASS_NAME.RACING_TRACK}[data-car-name="${car.name}"]`);

      $track.insertAdjacentHTML("beforeend", '<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.location));
    });
  }
}

export default RacingCourseView;
