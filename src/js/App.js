import { createElement, wait } from "./utils/utils.js";
import $store from "./store/index.js";

import GameSettingInput from "./components/GameSettingInput.js";
import CarList from "./components/CarList.js";
import WinnerList from "./components/WinnerList.js";

import { WINNING_MASSAGE } from "./utils/constnats.js";

const template = `
  <section class="game-setting-input d-flex justify-center mt-5">
  </section>
  <section class="d-flex justify-center mt-5">
    <div class="car-list mt-4 d-flex">
    </div>
  </section>
  <section class="result-section d-flex justify-center mt-5">
    <div>
      <h2 class="winner-list"></h2>
      <div class="d-flex justify-center">
        <button type="button" class="reset-btn btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  </section>

`;

export default function App(target) {
  const dom = createElement(target, template);
  const resetBtn = dom.querySelector(".reset-btn");

  const init = () => {
    GameSettingInput(".game-setting-input", { startRace });
    CarList(".car-list");
    WinnerList(".winner-list");

    initEventListener();
  };

  const initEventListener = () => {
    resetBtn.addEventListener("click", resetGame);
  };

  const startRace = async (racingTimes) => {
    $store.game.setLoading(true);
    for (let i = 0; i < racingTimes; i++) {
      await wait(1000);
      $store.game.raceAll();
    }
    $store.game.setLoading(false);

    $store.game.determineWinner();

    congratulate();
  };

  const congratulate = async () => {
    await wait(2000);
    if ($store.game.getWinnerNames().length) {
      alert(WINNING_MASSAGE);
    }
  };

  const resetGame = () => {
    location.reload();
  };

  init();

  return dom;
}
