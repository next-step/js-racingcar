import {
  ERROR_MESSAGE,
  CONGRATS_MESSAGE,
  INPUT_TYPE,
} from "./utils/constants.js";
import { $ } from "./utils/dom.js";

export default function CarGame($el) {
  const form = $("form");
  const names = $("#names");
  const namesInput = $("#names input");
  const nameCards = $("#nameCards");
  const nameSubmitBtn = $("button", names);
  const gameWinner = $("#winner");

  let carNames = [];
  let times = "";
  let carsDistance = [];
  let winner = [];

  const SUBMIT_ACTION = {
    submitNames: onCarNamesSubmit,
    submitTimes: onGameTimesSubmit,
  };

  const $form = $("form", $el);
  $form.addEventListener("click", e => {
    e.preventDefault();
    let action = e.target.dataset.action;

    if (action) {
      SUBMIT_ACTION[action]();
    }
  });

  function onCarNamesSubmit() {
    carNames = blankCheckedNames(namesInput.value);
    showGameTimesInput();
    handleDisableNames(true);
  }

  function blankCheckedNames(names) {
    const namesArr = names.split(",");
    const blankFilterNames = namesArr.filter(Boolean).map(name => name.trim());
    return blankFilterNames.map(name => isNameUnderFiveWords(name));
  }

  function isNameUnderFiveWords(name) {
    if (name.length < 5) {
      return name;
    } else {
      alert(ERROR_MESSAGE.NAME_LENGTH_ERROR);
      return name.slice(0, 5);
    }
  }

  function handleDisableNames(bool = true) {
    namesInput.disabled = bool;
    nameSubmitBtn.disabled = bool;
  }

  function handleDisableGameTimes(bool = true) {
    const gameTimes = $("#times");
    const gameTimesInput = $("#times input");
    const gameTimesSubmitBtn = $("button", gameTimes);
    gameTimesInput.disabled = bool;
    gameTimesSubmitBtn.disabled = bool;
  }

  function showGameTimesInput() {
    const gameTimesField = form.lastElementChild;
    gameTimesField.innerHTML = `
    <p>시도할 횟수를 입력해주세요.</p>
    <div id="times" class="d-flex">
      <input type="number" name="times" class="w-100 mr-2" placeholder="시도 횟수" autofocus autocomplete="off" />
      <button type="submit" class="btn btn-cyan" data-action="submitTimes">확인</button>
    </div>
    `;
    form.appendChild(gameTimesField);
  }

  function onGameTimesSubmit() {
    const gameTimesInput = $("#times input");
    times = gameTimesInput.value;

    if (times === "0") {
      return alert(ERROR_MESSAGE.TIMES_ERROR);
    }

    handleDisableGameTimes(true);
    showPlayCars();
  }

  function makeDisplayCars() {
    const nameCard = document.createElement("div");
    nameCard.setAttribute("class", "mt-4 d-flex");
    const nameCardComponents = carNames
      .map(
        name => `
        <div class="mr-2 car-container" data-name=${name}>
          <div class="car-player">${name}</div>
        </div>`
      )
      .join("");
    nameCard.innerHTML = `
      ${nameCardComponents}
      `;
    nameCards.appendChild(nameCard);
  }

  function showPlayCars() {
    makeDisplayCars();
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
    carNames.forEach((carName, i) => {
      km = Math.floor(Math.random() * 10);
      if (!carsDistance[i] && carsDistance[i] !== 0) {
        carsDistance[i] = 0;
      }

      if (km < 4) return;
      carsDistance[i]++;
      showMovedCars(carName);
    });
  }

  function showMovedCars(name) {
    const carCard = $(`.car-container[data-name="${name}"]`);
    const moveIcon = document.createElement("div");
    moveIcon.setAttribute("class", "forward-icon mt-2");
    moveIcon.textContent = "⬇️";
    carCard.appendChild(moveIcon);
  }

  function pickWinner() {
    const maxDistance = Math.max(...carsDistance);
    const winnerNames = carsDistance.reduce((names, cur, idx) => {
      if (cur !== maxDistance) return names;
      names.push(carNames[idx]);
      return names;
    }, []);
    winner.push(...winnerNames);
  }

  function showWinner() {
    const winnersName = winner.join();
    gameWinner.innerHTML = `
        <div>
          <h2>🏆 최종 우승자: ${winnersName} 🏆</h2>
          <div class="d-flex justify-center">
            <button type="reset" class="btn btn-cyan">다시 시작하기</button>
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
    const gameResetBtn = $("button", gameWinner);
    gameResetBtn.addEventListener("click", () => {
      handleDisableNames(false);
      resetNameState();
      handleDisableGameTimes(false);
      resetGameTimeState();
      resetState();
      form.lastElementChild.innerHTML = "";
      clearTimeout(timerId);
    });
  }

  function resetState() {
    carNames = [];
    times = "";
    carsDistance = [];
    winner = [];
  }

  function resetNameState() {
    nameCards.innerHTML = "";
    namesInput.value = "";
  }

  function resetGameTimeState() {
    const gameTimesInput = $("#times input");
    gameWinner.innerHTML = "";
    gameTimesInput.value = "";
  }
}
