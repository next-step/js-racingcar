class RacingGameView {
  constructor() {
    this.$carNamesInput = document.getElementById("car-names-input");
    this.$carNamesButton = document.getElementById("car-names-button");
    this.$racingCountInput = document.getElementById("racing-count-input");
    this.$racingGameForm = document.getElementById("racing-game-form");
    this.$racingCountButton = document.getElementById("racing-count-button");
    this.$racingCountFieldSet = document.getElementById(
      "racing-count-fieldset"
    );
    this.$racingSection = document.getElementById("racing-section");
    this.$winnerSection = document.getElementById("winner-section");
  }

  enableElement($target) {
    $target.removeAttribute("disabled");
    $target.classList.remove("disabled");
  }

  disableElement($target) {
    $target.setAttribute("disabled", "");
    $target.classList.add("disabled");
  }

  showElement($target) {
    $target.classList.remove("hide");
  }

  templateRacingSection(Cars) {
    return Cars.map((Car) => Car.templateCarName()).join("");
  }

  templateWinners(winners) {
    return `<h2>🏆 최종 우승자: ${winners} 🏆</h2>`;
  }
}

export default RacingGameView;
