import View from "./View.js";

class RacingGameView extends View {
  constructor() {
    super();

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
    this.$resetButton = document.getElementById("retry-button");
  }

  templateRacingSection(Cars) {
    return Cars.map((Car) => Car.templateCarName()).join("");
  }

  templateWinners(winners) {
    return `<h2>🏆 최종 우승자: ${winners} 🏆</h2>`;
  }
}

export default RacingGameView;
