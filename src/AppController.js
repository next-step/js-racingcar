import { $ } from "./selectors.js";

export default class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }
  init = () => {
    $("#app").addEventListener("click", (e) => {
      if (e.target.id === "text-btn") {
        this.model.setCars($('input[type="text"]').value);
        this.view.renderTryInput($("fieldset"), "afterend");
        return;
      }
      if (e.target.id === "number-btn") {
        const newTryTimes = $('input[type="number"]').value;
        this.model.setTryTimes(newTryTimes);
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
      if (this.model.isTryTimesExpired()) {
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
