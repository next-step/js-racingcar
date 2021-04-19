import { $ } from "../utils/DOM.js";
import { app } from "./app.js";
import { state } from "../utils/state.js";
import { CONGRATULATION_ALERT_DELAY, MSG } from "../utils/constants.js";

export const winner = () => {
  const highGrade = Math.max(...state.cars.map((car) => car.position));
  const winners = state.cars
    .filter((car) => car.position === highGrade)
    .map((v) => v.name)
    .join(", ");

  $(
    "#winnerWrap"
  ).innerHTML = `<h2>🏆 최종 우승자: <span>${winners}</span> 🏆</h2>
  <div class="d-flex justify-center">
    <button id="retry" type="button" class="btn btn-cyan">다시 시작하기</button>
  </div>`;

  setTimeout(() => {
    alert(MSG.CONGRATULATIONS);
  }, CONGRATULATION_ALERT_DELAY);

  $("#retry").addEventListener("click", () => {
    state.cars = [];
    state.racingTimes = 0;

    app();
  });
};
