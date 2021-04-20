import createElement from "../utils/createElement.js";
import $store from "../store/index.js";

const CarListItem = (name) => `
  <div class="mr-2">
    <div class="car-player">${name}</div>
  </div>
`;

export default function CarList(target) {
  const dom = createElement(target);

  const init = () => {
    $store.game.subscribe("cars", render);
  };

  const render = () => {
    const carNames = $store.game.getCarNames();
    dom.innerHTML = carNames.map(CarListItem).join("");
  };

  init();

  return dom;
}
