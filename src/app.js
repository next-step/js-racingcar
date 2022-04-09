import {
  COMMAND_GO,
  getCarsNames,
  getCommand,
  getRandomNumber,
  getTryCount,
  isEmpty,
} from "./module/core.mjs";
import { drawCars, forwardIcon } from "./module/templates.mjs";
import { MSG_ERROR_NO_NAMES } from "./module/constants.mjs";

function initApp() {
  const $app = document.querySelector("#app");
  if (!$app) return;
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
      names.forEach(runRound);
    }
  }

  $carsNameSubmit.addEventListener("click", () => {
    if (isEmpty($carsNameInput.value)) {
      $tryCntFieldSet.classList.remove("hidden");
      return;
    }
    alert(MSG_ERROR_NO_NAMES);
  });

  $tryCntSubmit.addEventListener("click", () => {
    try {
      const count = getTryCount($tryCntInput.value);
      const names = getCarsNames($carsNameInput.value);

      $raceContainer.classList.remove("hidden");
      $raceContainer.innerHTML = drawCars(names);

      runRace(count, names);
    } catch (e) {
      alert(e.message);
    }
  });
}

initApp();
