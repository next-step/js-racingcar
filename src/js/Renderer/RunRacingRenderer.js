import Renderer from "./Renderer.js";

class RunRacingRenderer extends Renderer {
  #e;
  setElement(e) {
    this.#e = e;
  }

  initRenderer() {
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

  finishLoadingRacingRenderer() {
    document.querySelector(`div[data-race-loading="${this.#e}"]`).remove();
  }

  movesForwardRenderer() {
    document
      .querySelector(`div[data-racecar-name="${this.#e}"]`)
      .insertAdjacentHTML(
        "beforeend",
        `<div class="forward-icon mt-2">⬇️️</div>`
      );
  }
}
export default RunRacingRenderer;
