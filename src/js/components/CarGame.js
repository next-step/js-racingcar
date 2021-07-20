import { $, setSelectorHidden } from "../utils/util.js";
import { carList } from "../Car.js";
import { setWinnerList } from "./WinnerList.js";
const $carGameList = $("#carGameList");
let gameCnt = 0;

export const CarGame = () => {
  setSelectorHidden($carGameList, true);
};

export const setGameCnt = (input) => {
  gameCnt = Number(input);
};

export const startGame = () => {
  setSelectorHidden($carGameList, false);
  let max = 0;
  for (let i = 0; i < gameCnt; i++) {
    carList.forEach((car) => {
      const rNum = Math.random() * 10;
      if (rNum >= 4) {
        car.distance++;
      }
      max = Math.max(max, car.distance);
    });

    renderGame();
  }
  const result = carList.filter((car) => car.distance == max);
  setWinnerList(result);
};

export const renderGame = () => {
  // console.log(carList);
  $carGameList.innerHTML = "";
  let inputHTMP = "";
  inputHTMP += '<div class="mt-4 d-flex">';
  carList.forEach((car) => {
    inputHTMP += `<div class="mr-2">`;
    inputHTMP += `<div class="car-player">${car.name}</div>`;
    for (let i = 0; i < car.distance; i++) {
      inputHTMP += `<div class="forward-icon mt-2">⬇️️</div>`;
    }
    inputHTMP += "</div>";
  });
  inputHTMP += "</div>";
  $carGameList.innerHTML = inputHTMP;
};

const gameStart = () => {};
