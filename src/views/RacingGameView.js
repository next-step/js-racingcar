class RacingGameView {
  constructor() {
    this.$carNamesInput = document.getElementById("car-names-input");
    this.$carNamesButton = document.getElementById("car-names-button");
    this.$racingCountInput = document.getElementById("racing-count-input");
    this.$racingGameForm = document.getElementById("racing-game-form");
    this.$racingCountFieldSet = document.getElementById(
      "racing-count-fieldset"
    );
  }

  showElement(target) {
    target.classList.remove("hidden");
  }
}

export default RacingGameView;
