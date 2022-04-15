import {
  COMMAND_GO,
  getCarsNames,
  getCommand,
  getRandomNumber,
  getTryCount,
  getWinners,
} from "./core/racing.mjs";
import { carListTemplate, forwardIconTemplate } from "./core/templates.mjs";
import { MSG_ERROR_NO_NAMES } from "./core/constants.mjs";
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

  async function runRound(names) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = names.reduce(
          (acc, curr) => ({ ...acc, [curr]: null }),
          {}
        );
        names.forEach((name) => {
          const randomNumber = getRandomNumber(0, 9);
          const command = getCommand(randomNumber);

          if (command === COMMAND_GO) {
            document
              .querySelector(`[aria-label="${name}"]`)
              .insertAdjacentHTML("beforeend", forwardIconTemplate);
          }
          result[name] = command;
        });

        resolve(result);
      }, 1000);
    });
  }

  async function runRace(maxRound, names) {
    const raceResult = names.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {}
    );

    const roundsResult = await Promise.all(
      [...Array(maxRound).keys()].map((_) => runRound(names))
    );

    roundsResult.forEach((result) => {
      Object.entries(result).forEach(([key, value]) => {
        raceResult[key].push(value);
      });
    });

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
      }, 1000);
    } catch (e) {
      alert(e.message);
    }
  });
}

initApp();
