export const GameResult = () => {
  const target = document.querySelector("#game-result-component");
  const render = (target) => {
    target.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="d-flex justify-center mt-5">
        <div>
            <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
            <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
        </div>
        </div>
            `
    );
  };

  render(target);
};
