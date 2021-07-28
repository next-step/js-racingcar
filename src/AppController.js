import { isValidNames } from "./utils/helpers.js";
import { $ } from "./utils/selectors.js";

export default class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }
  init = () => {
    $("#app").addEventListener("click", (e) => {
      if (e.target.id === "text-btn") {
        const carNames = $('input[type="text"]').value;
        if (isValidNames(carNames)) {
          this.model.setCars(carNames);
          this.view.renderTextInput($("#form"), carNames);
          this.view.renderTryInput($(".car-field"));
        }
      }
      if (e.target.id === "number-btn") {
        const newTryTime = $('input[type="number"]').value;
        this.model.setTryTime(newTryTime);
        this.view.renderCars($(".mt-4"), this.model.getCars());
        this.raceStart();
        return;
      }
      if (e.target.id === "reset-btn") {
        this.model.reset();
        this.view.renderReset($("#app"));
        return;
      }
    });
  };
  raceStart = () => {
    const intervalId = setInterval(() => {
      this.view.renderCars($(".mt-4"), this.model.racingCars());
      if (this.model.isTryTimeExpired()) {
        this.raceEnd(intervalId);
      }
    }, 1000);
  };
  raceEnd = (intervalId) => {
    clearInterval(intervalId);
    this.view.renderCars($(".mt-4"), this.model.stopRacingCars());
    this.view.renderWinners($(".winners"), this.model.getWinners());
  };
}
