import Renderer from "./Renderer.js";
class InputNumberOfMatchesRenderer extends Renderer {
  #e;

  setElement(e) {
    this.#e = e;
  }

  initRenderer() {
    this.#e.target.insertAdjacentHTML(
      "beforeend",
      `<fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" id="try-count-input" class="w-100 mr-2" placeholder="시도 횟수" />
          <button id="try-count-btn" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>`
    );
  }
}
export default InputNumberOfMatchesRenderer;
