import { ERROR_MESSAGE, CONGRATS_MESSAGE, INPUT_TYPE } from "./constants.js";
import { $ } from "./utils.js";

export default function CarGame() {
  const form = $("form");
  const names = $("#names");
  const namesInput = $("#names input");
  const nameCards = $("#nameCards");
  const nameSubmitBtn = names.querySelector("button");
  const gameWinner = $("#winner");

  let carNames = [];
  let times = "";
  let carsDistance = [];
  let winner = [];

  namesInput.addEventListener("keyup", ({ target }) => {
    carNames = target.value;
    carNames = checkCarNames(carNames);
  });

  function onCarNamesSubmit() {
    nameSubmitBtn.addEventListener("click", () => {
      showGameTimesInput();
      onGameTimesSubmit();
      preventInput(INPUT_TYPE.NAME);
    });
  }

  function checkCarNames(names) {
    const namesArr = names.split(",");
    const nameBlankCheck = namesArr
      .map(name => name.replace(/(^\s*)|(\s*$)/gi, ""))
      .filter(name => !!name);
    const nameLengthCheck = nameBlankCheck.map(x => isNameUnderFiveWords(x));
    return nameLengthCheck;
  }

  function isNameUnderFiveWords(name) {
    const isUnderFiveWords = /^.{0,5}$/;
    if (isUnderFiveWords.test(name)) {
      return name;
    } else {
      alert(ERROR_MESSAGE.NAME_LENGTH_ERROR);
      return name.slice(0, 5);
    }
  }

  function preventInput(type) {
    if (type === INPUT_TYPE.NAME) {
      namesInput.disabled = true;
      nameSubmitBtn.disabled = true;
      return;
    }

    if (type === INPUT_TYPE.GAMETIMES) {
      const gameTimes = $("#times");
      const gameTimesInput = $("#times input");
      const gameTimesSubmitBtn = gameTimes.querySelector("button");
      gameTimesInput.disabled = true;
      gameTimesSubmitBtn.disabled = true;
      return;
    }
  }

  function showGameTimesInput() {
    const gameTimesField = form.lastElementChild;
    gameTimesField.innerHTML = `
    <p>시도할 횟수를 입력해주세요.</p>
    <div id="times" class="d-flex">
      <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
      <button type="button" class="btn btn-cyan">확인</button>
    </div>
    `;
    form.appendChild(gameTimesField);
  }

  function onGameTimesSubmit() {
    const gameTimes = $("#times");
    const gameTimesInput = $("#times input");
    const gameTimesSubmitBtn = gameTimes.querySelector("button");
    gameTimesSubmitBtn.addEventListener("click", () => {
      times = gameTimesInput.value;

      if (times === "0") {
        return alert(ERROR_MESSAGE.TIMES_ERROR);
      }

      preventInput(INPUT_TYPE.GAMETIMES);
      showPlayCars();
    });
  }

  function showPlayCars() {
    const nameCard = document.createElement("div");
    nameCard.setAttribute("class", "mt-4 d-flex");
    const nameCardComponents = carNames
      .map(
        name => `
        <div class="mr-2" data-name=${name}>
          <div class="car-player">${name}</div>
        </div>`
      )
      .join("");
    nameCard.innerHTML = `
    ${nameCardComponents}
    `;
    nameCards.appendChild(nameCard);
    playGames(times);
    pickWinner();
    showWinner();
  }

  function playGames(times) {
    for (let i = 0; i < times; i++) {
      calculateDistance();
    }
  }

  function calculateDistance() {
    let km = 0;
    for (let i = 0; i < carNames.length; i++) {
      km = Math.floor(Math.random() * 10);
      if (!carsDistance[i] && carsDistance !== 0) {
        carsDistance[i] = 0;
      }

      if (km >= 4) {
        carsDistance[i]++;
        showMovedCars(carNames[i]);
      }
    }
  }

  function showMovedCars(name) {
    const carCard = $(`.mr-2[data-name="${name}"]`);
    const moveIcon = document.createElement("div");
    moveIcon.setAttribute("class", "forward-icon mt-2");
    moveIcon.textContent = "⬇️";
    carCard.appendChild(moveIcon);
  }

  function pickWinner() {
    const maxDistance = carsDistance.reduce((previous, current) => {
      return previous > current ? previous : current;
    });
    let index = carsDistance.indexOf(maxDistance);
    while (index !== -1) {
      winner.push(carNames[index]);
      index = carsDistance.indexOf(maxDistance, index + 1);
    }
  }

  function showWinner() {
    const winnersName = winner.join();
    gameWinner.innerHTML = `
        <div>
          <h2>🏆 최종 우승자: ${winnersName} 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
    `;
    const timerId = setTimeout(
      () => alert(CONGRATS_MESSAGE(winnersName)),
      2000
    );
    onGameReset(timerId);
  }

  function onGameReset(timerId) {
    const gameTimes = $("#times");
    const gameTimesInput = $("#times input");
    const gameTimesSubmitBtn = gameTimes.querySelector("button");
    const gameResetBtn = gameWinner.querySelector("button");
    gameResetBtn.addEventListener("click", () => {
      nameCards.innerHTML = "";
      form.lastElementChild.innerHTML = "";
      gameWinner.innerHTML = "";
      namesInput.disabled = false;
      nameSubmitBtn.disabled = false;
      gameTimesInput.disabled = false;
      gameTimesSubmitBtn.disabled = false;
      namesInput.value = "";
      gameTimesInput.value = "";
      carNames = [];
      times = "";
      carsDistance = [];
      winner = [];
      clearTimeout(timerId);
    });
  }

  onCarNamesSubmit();
}
