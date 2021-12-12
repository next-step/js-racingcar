import { racingCarGameStoreAction } from "../stores/RacingCarGameStore.js";
import CarNamesFormView from "../views/CarNamesFormView.js";
import RacingCourseView from "../views/RacingCourseView.js";
import { CLASS_NAME } from "../constants/selectors.js";
import { EVENT_NAME } from "../constants/events.js";
import { CAR_NAME_MAX_LENGTH, CAR_NAME_MIN_LENGTH } from "../constants/car.js";
import { ALERT_MESSAGE } from "../constants/messages.js";
import TryCountFormView from "../views/TryCountFormView.js";

class RacingCarGameController {
  constructor() {
    this.carNamesFormView = new CarNamesFormView(document.querySelector(`.${CLASS_NAME.CAR_NAMES_FORM_CONTAINER}`));
    this.tryCountFormView = new TryCountFormView(document.querySelector(`.${CLASS_NAME.TRY_COUNT_FORM_CONTAINER}`));
    this.racingCourseView = new RacingCourseView(document.querySelector(`.${CLASS_NAME.RACING_COURSE}`));
  }

  init() {
    this.carNamesFormView.init();
    this.tryCountFormView.init();
    this.racingCourseView.init();

    this.bindEvents();
  }

  bindEvents() {
    this.carNamesFormView.on(EVENT_NAME.SUBMIT.CAR_NAMES, this.onCarNamesSubmit.bind(this));
    this.tryCountFormView.on(EVENT_NAME.SUBMIT.TRY_COUNT, this.onTryCountSubmit.bind(this));
  }

  onCarNamesSubmit({ detail }) {
    const carNames = detail.carNamesString.replaceAll(/\s|^,|,$/g, "").split(",");
    const isAllCarNameLengthInRange = carNames.every(
      (name) => name.length >= CAR_NAME_MIN_LENGTH && name.length <= CAR_NAME_MAX_LENGTH
    );
    const isDuplicateNameExist = new Set(carNames).size !== carNames.length;

    if (!isAllCarNameLengthInRange) {
      alert(ALERT_MESSAGE.INVALID_CAR_NAME_LENGTH);

      return;
    }

    if (isDuplicateNameExist) {
      alert(ALERT_MESSAGE.DUPLICATE_CAR_NAME);

      return;
    }

    racingCarGameStoreAction.initCars(carNames);
    this.racingCourseView.show();
  }

  onTryCountSubmit({ detail }) {
    racingCarGameStoreAction.progressCar(detail.tryCount);
  }
}

export default RacingCarGameController;
