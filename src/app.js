import {
  COMMAND_GO,
  getCarsNames,
  getCommand,
  getRandomNumber,
  getTryCount,
  getWinners,
} from "./core/racing.mjs";
import {
  carListTemplate,
  forwardIconTemplate,
  spinner,
} from "./core/templates.mjs";
import { MSG_ERROR_NO_NAMES, RACE_DELAY_TIME } from "./core/constants.mjs";
import { isEmpty } from "./core/validation.mjs";
import { RaceResultComponent } from "./core/components.mjs";

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

  function addSpinners($names) {
    $names.forEach(($name) => $name.insertAdjacentHTML("beforeend", spinner));
  }

  function removeSpinners() {
    document.querySelectorAll(".spinner-block").forEach((el) => {
      el.remove();
    });
  }

  async function runRound(names) {
    return new Promise((resolve) => {
      const $spinnerBlocks = names.reduce((acc, name) => {
        acc[name] = document.querySelector(
          `[aria-label="${name}"] .spinner-block`
        );
        return acc;
      }, {});

      setTimeout(() => {
        const result = names.reduce(
          (acc, curr) => ({ ...acc, [curr]: "" }),
          {}
        );
        names.forEach((name) => {
          const randomNumber = getRandomNumber(0, 9);
          const command = getCommand(randomNumber);

          if (command === COMMAND_GO) {
            $spinnerBlocks[name].insertAdjacentHTML(
              "beforebegin",
              forwardIconTemplate
            );
          }
          result[name] = command;
        });

        resolve(result);
      }, RACE_DELAY_TIME);
    });
  }

  async function roundRunner(names, resultObject, remainTime = 0) {
    if (!remainTime) {
      return resultObject;
    }
    const resultOfRound = await runRound(names);

    Object.entries(resultOfRound).forEach(([key, value]) => {
      resultObject[key]
        ? resultObject[key].push(value)
        : (resultObject[key] = [value]);
    });

    return await roundRunner(names, resultObject, remainTime - 1);
  }

  async function runRace(maxRound, names) {
    const $cars = names.map((name) =>
      document.querySelector(`[aria-label="${name}"]`)
    );

    addSpinners($cars);
    const raceResult = await roundRunner(names, {}, maxRound);
    removeSpinners();

    return raceResult;
  }

  $carsNameSubmit.addEventListener("click", () => {
    if (isEmpty($carsNameInput.value)) {
      $tryCntFieldSet.classList.remove("hidden");
      return;
    }
    alert(MSG_ERROR_NO_NAMES);
  });

  $tryCntSubmit.addEventListener("click", async () => {
    try {
      const count = getTryCount($tryCntInput.value);
      const names = getCarsNames($carsNameInput.value);

      $raceContainer.innerHTML = carListTemplate(names);

      const raceResult = await runRace(count, names);
      const winners = getWinners(raceResult);

      $result.appendChild(
        RaceResultComponent(winners, {
          onResetButtonClick: () => {
            $carsNameInput.value = "";
            $tryCntFieldSet.classList.add("hidden");
            $tryCntInput.value = "";
            $raceContainer.innerHTML = "";
            $result.innerHTML = "";
          },
        })
      );

      setTimeout(() => {
        alert("🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇");
      }, 2000);
    } catch (e) {
      alert(e.message);
    }
  });
}

initApp();
