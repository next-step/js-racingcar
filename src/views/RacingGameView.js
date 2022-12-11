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

    this.init();
  }

  init() {
    this.enableElement(this.$carNamesInput);
    this.enableElement(this.$carNamesButton);

    this.$racingSection.innerHTML = "";

    this.removeWinners();
    this.hideElement(this.$racingSection);
    this.hideElement(this.$winnerSection);
    this.hideElement(this.$racingCountFieldSet);
  }

  onFinishInputCarNames() {
    this.disableElement(this.$carNamesInput);
    this.disableElement(this.$carNamesButton);
  }

  onStartInputRacingCount() {
    this.showElement(this.$racingCountFieldSet);
    this.enableElement(this.$racingCountInput);
    this.enableElement(this.$racingCountButton);
  }

  onFinishInputRacingCount() {
    this.showElement(this.$racingSection);
    this.disableElement(this.$racingCountInput);
    this.disableElement(this.$racingCountButton);
  }

  removeWinners() {
    const $winnerTags = this.$winnerSection.getElementsByTagName("h2");
    if ($winnerTags.length > 0) {
      this.$winnerSection.firstChild.remove();
    }
  }

  templateWinners(winners) {
    return `<h2>🏆 최종 우승자: ${winners} 🏆</h2>`;
  }
}

export default RacingGameView;
