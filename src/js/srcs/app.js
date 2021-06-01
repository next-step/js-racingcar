import { $ } from "../utils/DOM.js";
import { carName } from "./carName.js";

export const app = () => {
  $("#app").innerHTML = `
  <section class="d-flex justify-center mt-5">
    <form>
      <fieldset>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div id="carNameWrap" class="d-flex"></div>
      </fieldset>
      <fieldset id="raceTimesWrap"></fieldset>
    </form>
  </section>
  <section id="carRacingWrap" class="d-flex justify-center mt-5">
  </section>
  <section class="d-flex justify-center mt-5">
    <div id="winnerWrap"></div>
  </section>
`;

  carName();
};
