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
    this.$winnerSection = document.getElementById("winner-section");
  }

  showElement(target) {
    target.classList.remove("hide");
  }

  templateRacingSection(Cars) {
    return Cars.map((Car) => Car.templateCarName()).join("");
  }

  templateWinners(winners) {
    return `
        <div>
          <h2>🏆 최종 우승자: ${winners
            .map((winner) => winner)
            .join("")} 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
    `;
  }
}

export default RacingGameView;
