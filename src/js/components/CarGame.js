import { $, setSelectorHidden } from "../utils/util.js";
import { carList } from "../Car.js";
const $carGameList = $("#carGameList");

export const CarGame = () => {
  setSelectorHidden($carGameList, true);
};

export const renderGame = () => {
  console.log(carList);
  $carGameList.innerHTML = "";
  $carGameList.innerHTML += '<div class="mt-4 d-flex">';
  carList.forEach((car) => {
    $carGameList.innerHTML += '<div class="mr-2">';
    $carGameList.innerHTML += `<div class="car-player">${car.name}</div>`;
    for (let i = 0; i < car.distance; i++) {
      $carGameList.innerHTML += '<div class="forward-icon mt-2">⬇️️</div>';
    }
    $carGameList.innerHTML += "</div>";
  });
  $carGameList.innerHTML += "</div>";
};
