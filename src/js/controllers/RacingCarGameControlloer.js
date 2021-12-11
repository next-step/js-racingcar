import racingCarGameStore from "../stores/RacingCarGameStore.js";
import CarNamesFormView from "../views/CarNamesFormView.js";
import RacingCourseView from "../views/RacingCourseView.js";
import { CLASS_NAME } from "../constants/selectors.js";
import { EVENT_NAME } from "../constants/events.js";
import { CAR_NAME_MAX_LENGTH, CAR_NAME_MIN_LENGTH } from "../constants/car.js";
import { ALERT_MESSAGE } from "../constants/messages.js";

class RacingCarGameController {
  constructor() {
    this.carNamesFormView = new CarNamesFormView(document.querySelector(`.${CLASS_NAME.CAR_NAMES_FORM_CONTAINER}`));
    this.racingCourseView = new RacingCourseView(document.querySelector(`.${CLASS_NAME.RACING_COURSE}`));
  }

  init() {
    this.carNamesFormView.init();
    this.racingCourseView.init();

    this.bindEvents();
  }

  bindEvents() {
    this.carNamesFormView.on(EVENT_NAME.SUBMIT.CAR_NAMES, this.onCarNamesSubmit.bind(this));
  }

  onCarNamesSubmit({ detail }) {
    const carNames = detail.carNamesString.replaceAll(/\s|^,|,$/g, "").split(",");
    const isAllCarNameLengthInRange = carNames.every(
      (name) => name.length >= CAR_NAME_MIN_LENGTH && name.length <= CAR_NAME_MAX_LENGTH
    );

    if (!isAllCarNameLengthInRange) {
      alert(ALERT_MESSAGE.INVALID_CAR_NAME_LENGTH);

      return;
    }

    racingCarGameStore.setState({ carNames });
    this.racingCourseView.show();
  }
}

export default RacingCarGameController;
