import { setCarNameEvent } from "./setCarNameEvent.js"

const renderReset = () => {
    const body = document.querySelector("body")
    body.innerHTML = `
    <div id="app">
      <section class="d-flex justify-center mt-5">
        <form>
          <fieldset>
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input type="text" class="w-100 mr-2" id="carNameInput" placeholder="자동차 이름" />
              <button type="button" id="carNameButton" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
          <fieldset>
          </fieldset>
        </form>
      </section>
      <section class="d-flex justify-center mt-5">
        <div id="racing" class="mt-4 d-flex">
        </div>
      </section>
      <section id="result" class="d-flex justify-center mt-5">
      </section>
    </div>
    <script type="module" src="./src/js/index.js"></script>
    `
    setCarNameEvent();
}

export { renderReset }