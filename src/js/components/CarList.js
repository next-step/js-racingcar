import { createElement } from "../utils/utils.js";
import $store from "../store/index.js";

export default function CarList(target) {
  const dom = createElement(target);

  const init = () => {
    $store.game.subscribe("cars", render);
  };

  const render = () => {
    dom.innerHTML = "";

    const cars = $store.game.getCars();
    cars.forEach((car) => dom.appendChild(car.render()));
  };

  init();

  return dom;
}
