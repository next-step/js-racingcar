import {
  COMMAND_GO,
  getCarsNames,
  getCommand,
  getRandomNumber,
  getTryCount,
} from "./module/core.mjs";
import { drawCars, forwardIcon } from "./module/templates.mjs";

function initApp() {
  const $app = document.querySelector("#app");
  const $carsNameInput = $app.querySelector('[placeholder="자동차 이름"]');
  const $carsNameSubmit = $app.querySelector(
    '[placeholder="자동차 이름"] + button'
  );
  const $tryCntFieldSet = $app.querySelector(".try-count");
  const $tryCntInput = $app.querySelector('[placeholder="시도 횟수"]');
  const $tryCntSubmit = $app.querySelector(
    '[placeholder="시도 횟수"] + button'
  );
  const $raceContainer = $app.querySelector(".race");

  function runRound(name) {
    const randomNumber = getRandomNumber(0, 9);
    const command = getCommand(randomNumber);

    if (command === COMMAND_GO) {
      document
        .querySelector(`[aria-label="${name}"]`)
        .insertAdjacentHTML("beforeend", forwardIcon);
    }
  }

  function runRace(maxRound, names) {
    for (let i = 0; i < maxRound; i += 1) {
      $raceContainer.dataset.round = `${i + 1}`;
      names.forEach(runRound);
    }
  }

  $carsNameSubmit.addEventListener("click", () => {
    try {
      getCarsNames($carsNameInput.value);
      $tryCntFieldSet.classList.remove("hidden");
    } catch (e) {
      alert(e.message);
    }
  });

  $tryCntSubmit.addEventListener("click", () => {
    try {
      const count = getTryCount($tryCntInput.value);
      $raceContainer.classList.remove("hidden");
      const names = getCarsNames($carsNameInput.value);
      $raceContainer.innerHTML = drawCars(names);

      runRace(count, names);
    } catch (e) {
      alert(e.message);
    }
  });
}

initApp();
