const $form = document.querySelector("form");

const $wrapCarsName = document.getElementById("wrap-cars-name");
const $inputCarsName = $wrapCarsName.querySelector("input");
const $buttonCarsName = $wrapCarsName.querySelector("button");

const $wrapTryTimes = document.getElementById("wrap-try-times");
const $inputTryTimes = $wrapTryTimes.querySelector("input");
const $buttonTryTimes = $wrapTryTimes.querySelector("button");

const $racingBoardSection = document.getElementById("racing-board-section");
const $racingBoard = document.getElementById("racing-board");
const $racingResult = document.getElementById("racing-result");

const $winners = document.getElementById("winners");
const $retry = document.getElementById("retry");

let cars = [];

readyPlayer = (carsName) => {
  const splitCarsName = carsName.split(",");
  function run() {
    if (splitCarsName.length === 0) return;

    const carObject = getCarObject(splitCarsName.shift());
    cars.push(carObject);

    requestAnimationFrame(run);
  }
  requestAnimationFrame(run);
};

getCarObject = (name) => {
  name = name.trim();
  const wrapCarPlayer = drawCarPlayers(name);
  return new Car(name, wrapCarPlayer);
};

drawCarPlayers = (name) => {
  const wrapCarPlayer = document.createElement("div");
  wrapCarPlayer.className = "mr-2";
  const html = `
      <div class="car-player">${name}</div>
      <div class="d-flex justify-center mt-3 loading">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    `;
  wrapCarPlayer.innerHTML = html;
  $racingBoard.appendChild(wrapCarPlayer);
  return wrapCarPlayer;
};

celebrationAlert = () => {
  setTimeout(() => {
    alert(CELEBRATION_MSG);
  }, 2000);
};

gameOver = (results) => {
  const winner = [];
  const topScore = Math.max.apply(
    Math,
    results.map((result) => result[1])
  );

  results.forEach((result) => {
    if (topScore == result[1]) {
      winner.push(result[0]);
    }
  });

  toggle.visible($racingResult);
  $winners.innerText = winner.join(", ");
  celebrationAlert();
};

toggle = {
  visible: ($el, show = true) => {
    $el.classList[show ? "remove" : "add"]("d-none");
  },
  disabled: ($el, disabled = true) => {
    if (disabled) {
      $el.setAttribute("disabled", "disabled");
    } else {
      $el.removeAttribute("disabled");
    }
  },
};

onClickEvent = {
  carsName: (e) => {
    const carsName = $inputCarsName.value;
    isValid = checkNames(carsName);
    if (!isValid) {
      return errorAlert("INVALID_NAME");
    }

    toggle.disabled(e.target);
    toggle.visible($wrapTryTimes);

    readyPlayer(carsName);
  },
  tryTimes: (e) => {
    const tryTimes = parseInt($inputTryTimes.value, 10);
    isValid = checkTimes(tryTimes);
    if (!isValid) {
      return errorAlert("INVALID_TIMES");
    }

    toggle.disabled(e.target);
    toggle.visible($racingBoardSection);

    promiseCars = cars.map((car) => car.run(tryTimes));

    Promise.all([...promiseCars]).then(gameOver);
  },
  retry: () => {
    cars.length = 0;
    $form.reset();
    $racingBoard.innerHTML = $winners.innerText = "";
    document
      .querySelectorAll(".hide")
      .forEach(($el) => toggleVisible($el, false));
    document
      .querySelectorAll("[disabled]")
      .forEach(($el) => toggleDisabled($el, false));
  },
};

$buttonCarsName.addEventListener("click", onClickEvent.carsName);
$buttonTryTimes.addEventListener("click", onClickEvent.tryTimes);
$retry.addEventListener("click", onClickEvent.retry);
