import CarsInput from "./CarsInput.js";
import CountInput from "./CountInput.js";

function App() {
  return `
 
        <section class="d-flex justify-center mt-5">
          <form>
            <fieldset>
              <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
              <p>
                5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
                예시) EAST, WEST, SOUTH, NORTH
              </p>
              <div id="cars-input-component"></div>
            </fieldset>
            <fieldset>
              <div id="count-input-component"></div>
            </fieldset>
          </form>
        </section>
        <section class="d-flex justify-center mt-5">
          <div class="mt-4 d-flex">
            <div class="mr-2">
              <div class="car-player">EAST</div>
              <div class="forward-icon mt-2">⬇️️</div>
              <div class="forward-icon mt-2">⬇️️</div>
            </div>
            <div class="mr-2">
              <div class="car-player">WEST</div>
              <div class="forward-icon mt-2">⬇️️</div>
            </div>
            <div class="mr-2">
              <div class="car-player">SOUTH</div>
              <div class="d-flex justify-center mt-3">
                <div class="relative spinner-container">
                  <span class="material spinner"></span>
                </div>
              </div>
            </div>
            <div class="mr-2">
              <div class="car-player">NORTH</div>
              <div class="d-flex justify-center mt-3">
                <div class="relative spinner-container">
                  <span class="material spinner"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="d-flex justify-center mt-5">
          <div>
            <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
            <div class="d-flex justify-center">
              <button type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
          </div>
        </section>
 
        `;
}

/** Start Rendering App */
const appTarget = document.querySelector("#app");
appTarget.innerHTML = App();

/** Layout Components */
const carsInputTarget = document.querySelector("#cars-input-component");
carsInputTarget.innerHTML = CarsInput();
const countInputTarget = document.querySelector("#count-input-component");
countInputTarget.innerHTML = CountInput();
