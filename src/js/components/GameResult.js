export default class GameResult {
  constructor(target) {
    this.#render(target);
  }

  #render = (target) => {
    target.innerHTML = `
        <div class="d-flex justify-center mt-5">
        <div>
            <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
            <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
        </div>
        </div>
            `;
  };
}
