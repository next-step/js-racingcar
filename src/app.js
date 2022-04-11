import {
  COMMAND_GO,
  getCarsNames,
  getCommand,
  getRandomNumber,
  getTryCount,
  getWinners,
} from "./core/racing.mjs";
import {
  drawCars,
  forwardIcon,
  TemplateRaceResult,
} from "./core/templates.mjs";
import { MSG_ERROR_NO_NAMES } from "./core/constants.mjs";
import { isEmpty } from "./core/validation.mjs";

function initApp() {
  const $app = document.querySelector("#app");
  if (!$app) return;
  const $carsNameInput = $app.querySelector(".car-name-input");
  const $carsNameSubmit = $app.querySelector(".car-name-input + button");
  const $tryCntFieldSet = $app.querySelector(".try-count");
  const $tryCntInput = $app.querySelector(".try-count-input");
  const $tryCntSubmit = $app.querySelector(".try-count-input + button");
  const $raceContainer = $app.querySelector(".race");
  const $result = $app.querySelector(".result");

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

      $result.appendChild(
        TemplateRaceResult(winners, {
          onResetButtonClick: () => {
            $carsNameInput.value = "";
            $tryCntFieldSet.classList.add("hidden");
            $tryCntInput.value = "";
            $raceContainer.innerHTML = "";
            $result.innerHTML = "";
          },
        })
      );
    } catch (e) {
      alert(e.message);
    }
  });
}

initApp();
