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

  function getCarsNames() {
    const carsNames = $carsNameInput.value.split(",");
    if (
      carsNames.length === 0 ||
      carsNames.some((name) => name.trim() === "")
    ) {
      throw new Error("자동차 이름을 입력해주세요.");
    }
    return carsNames;
  }

  function getTryCount() {
    const count = parseInt($tryCntInput.value);
    if (!count) {
      throw new Error("0이 아닌 숫자를 입력해주세요.");
    }
    return count;
  }

  function drawCars(names) {
    return `<div class="mt-4 d-flex">
            ${names
              .map(
                (name) => `<div class="mr-2">
                <div class="car-player">${name}</div>
            </div>`
              )
              .join("")}
        </div>`;
  }

  $carsNameSubmit.addEventListener("click", () => {
    const names = getCarsNames();

    if (names instanceof Error) {
      alert(names.message);
      return;
    }
    $tryCntFieldSet.classList.remove("hidden");
  });

  $tryCntSubmit.addEventListener("click", () => {
    const count = getTryCount();

    if (count instanceof Error) {
      alert(count.message);
      return;
    }
    $raceContainer.classList.remove("hidden");
    const names = getCarsNames();
    $raceContainer.innerHTML = drawCars(names);

    function runRace(maxRound) {
      for (let i = 0; i < maxRound; i += 1) {
        $raceContainer.dataset.round = i + 1;
      }
    }
    runRace(count);
  });
}

initApp();
