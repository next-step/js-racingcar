import { MESSAGES } from "./utils/constants.js";
import { winnerMessage } from "./utils/helpers.js";

export default class CarView {
  renderTextInput = ($target, value = "") => {
    $target.innerHTML = `<fieldset class="car-field" data-cy="car-field">
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p class="info">
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex">
          <input type="text" class="w-100 mr-2" value="${value}" placeholder="자동차 이름" data-cy="car-input" 
          ${value && "disabled"}/>
          <button type="button" id="text-btn" class="btn btn-cyan" data-cy="car-button">확인</button>
        </div>
      </fieldset>`;
  };
  renderTryInput = ($target, pos = "afterend") => {
    $target.insertAdjacentHTML(
      pos,
      `<fieldset class="try-field" data-cy="try-field">
          <p>시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" data-cy="trytime-input"/>
          <button type="button" id="trytime-btn" class="btn btn-cyan" data-cy="trytime-button">확인</button>
          </div>
        </fieldset>`
    );
  };
  renderCars = ($target, cars) => {
    $target.innerHTML = cars
      .map(({ name, forwards }) => {
        return `<div class="mr-2" data-cy="car-container">
            <div class="car-player" data-cy="car-player">${name}</div>
            ${forwards
              .map((forward) =>
                forward <= 3
                  ? `<div class="d-flex justify-center mt-3" data-cy="spinner">
                <div class="relative spinner-container">
                  <span class="material spinner"></span>
                </div>
              </div>`
                  : `<div class="forward-icon mt-2" data-cy="forward">⬇️️</div>`
              )
              .join("")}
          </div>`;
      })
      .join("");
  };

  renderWinners = ($target, winners) => {
    $target.innerHTML = `<div data-cy="winner-section">
        <h2 data-cy="winner">${winnerMessage(winners.map((winner) => `${winner.name}`).join(","))}</h2>
        <div class="d-flex justify-center">
          <button type="button" id="reset-btn" class="btn btn-cyan" data-cy="reset-button">다시 시작하기</button>
        </div>
      </div>`;
    setTimeout(() => {
      alert(MESSAGES.CELEBERATE);
    }, 2000);
  };

  renderReset = ($target) => {
    $target.innerHTML = `<section class="d-flex justify-center mt-5">
      <form id="form">
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
