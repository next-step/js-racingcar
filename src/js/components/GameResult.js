export const GameResult = (winnerString, restartGame) => {
  const target = document.querySelector("#game-result-component");
  const render = (target) => {
    target.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="d-flex justify-center mt-5">
        <div>
            <h2 id="winner-text">🏆 최종 우승자: ${winnerString} 🏆</h2>
            <div class="d-flex justify-center">
            <button type="button" id="restart-button" class="btn btn-cyan">다시 시작하기</button>
            </div>
        </div>
        </div>
            `
    );
  };

  const setEvent = (handler) => {
    document
      .getElementById("restart-button")
      .addEventListener("click", handler);
  };

  render(target);
  setEvent(restartGame);
};
