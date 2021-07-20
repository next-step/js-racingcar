export default class CarView {
    constructor($app) {}
    renderTryInput = ($target, pos) => {
      $target.insertAdjacentHTML(
        pos,
        `<fieldset>
          <p>시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
          <button type="button" id="number-btn"class="btn btn-cyan">확인</button>
          </div>
          </fieldset>`
      );
    };
    renderCars = ($target, cars) => {
      $target.innerHTML = cars
        .map(({ carName, moved }) => {
          return `<div class="mr-2">
            <div class="car-player">${carName}</div>
            ${moved
              .map((move) => {
                if (move <= 3)
                  return ` <div class="d-flex justify-center mt-3">
                <div class="relative spinner-container">
                  <span class="material spinner"></span>
                </div>
              </div>`;
                return `<div class="forward-icon mt-2">⬇️️</div>`;
              })
              .join("")}
          </div>`;
        })
        .join("");
    };
    renderWinners = ($target, winners) => {
      $target.innerHTML = `<div>
        <h2>🏆 최종 우승자:${winners
          .map((winner) => {
            return `${winner.carName}`;
          })
          .join(",")} 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" id="reset-btn" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>`;
    };
  
    renderReset = ($target) => {
      $target.innerHTML = `<section class="d-flex justify-center mt-5">
      <form>
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
            <button type="button" id="text-btn" class="btn btn-cyan">
              확인
            </button>
          </div>
        </fieldset>
      </form>
    </section>
    <section class="d-flex justify-center mt-5">
      <div class="mt-4 d-flex">
      </div>
    </section>
    <section class="d-flex justify-center mt-5 winners">
    </section>
    `;
    };
  }