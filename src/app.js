import {
  COMMAND_GO,
  getCarsNames,
  getCommand,
  getRandomNumber,
  getTryCount,
  getWinners,
} from "./js/racing.mjs";
import { drawCars, forwardIcon, TemplateRaceResult } from "./js/templates.mjs";
import { MSG_ERROR_NO_NAMES } from "./constants.mjs";
import { isEmpty } from "./js/validation.mjs";

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
    return command;
  }

  function runRace(maxRound, names) {
    const raceResult = names.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {}
    );

    for (let i = 0; i < maxRound; i += 1) {
      names.forEach((name) => {
        raceResult[name].push(runRound(name));
      });
    }

    return raceResult;
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

      $raceContainer.innerHTML = drawCars(names);

      const raceResult = runRace(count, names);
      const winners = getWinners(raceResult);

      const $result = document.querySelector(".result");
      $result.innerHTML = TemplateRaceResult(winners);
    } catch (e) {
      alert(e.message);
    }
  });
}

initApp();
