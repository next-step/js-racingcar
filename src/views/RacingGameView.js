class RacingGameView {
  constructor() {
    this.$carNamesInput = document.getElementById("car-names-input");
    this.$carNamesButton = document.getElementById("car-names-button");
    this.$racingCountInput = document.getElementById("racing-count-input");
    this.$racingGameForm = document.getElementById("racing-game-form");
    this.$racingCountFieldSet = document.getElementById(
      "racing-count-fieldset"
    );
    this.$racingSection = document.getElementById("racing-section");
  }

  showElement(target) {
    target.classList.remove("hidden");
  }

  templateRacingSection(Cars) {
    return Cars.map((Car) => Car.templateCarName()).join("");
  }
}

export default RacingGameView;
