import View from "./View.js";

class RunRacingView extends View {
  #e;
  setElement(e) {
    this.#e = e;
  }

  initView() {
    document
      .querySelector(`div[data-racecar-name="${this.#e}"]`)
      .insertAdjacentHTML(
        "beforeend",
        `<div class="d-flex justify-center mt-3" data-race-loading="${this.#e}">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>`
      );
  }

  finishLoadingRacingView() {
    document.querySelector(`div[data-race-loading="${this.#e}"]`).remove();
  }

  movesForwardView() {
    document
      .querySelector(`div[data-racecar-name="${this.#e}"]`)
      .insertAdjacentHTML(
        "beforeend",
        `<div class="forward-icon mt-2">⬇️️</div>`
      );
  }
}
export default RunRacingView;
