import createElement from "./utils/createElement.js";
import $store from "./store/index.js";

import CarList from "./components/CarList.js";

import {
  ERROR_MESSAGE,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from "./utils/constnats.js";

const template = `
<div>
  <section class="d-flex justify-center mt-5">
    <form>
      <fieldset>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex">
          <input type="text" class="car-name-input w-100 mr-2" placeholder="자동차 이름" />
          <button type="button" class="car-name-submit btn btn-cyan">확인</button>
        </div>
      </fieldset>
      <fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>
    </form>
  </section>
  <section class="result-section d-flex justify-center mt-5">
    <div class="car-list mt-4 d-flex">
    </div>
  </section>
</div>
`;

export default function App(target) {
  const dom = createElement(target, template);

  const carNameInput = dom.querySelector(".car-name-input");
  const carNameSubmitBtn = dom.querySelector(".car-name-submit");

  const init = () => {
    CarList(".car-list");

    initEventListener();
  };

  const initEventListener = () => {
    carNameInput.addEventListener("keypress", onKeypressCarNameInput);
    carNameSubmitBtn.addEventListener("click", submitCarName);
  };

  const onKeypressCarNameInput = ({ target, key }) => {
    if (key !== "Enter" || !target.value) {
      return;
    }

    submitCarName();
  };

  const submitCarName = () => {
    const carNames = carNameInput.value.replace(" ", "").split(",");
    if (carNames.some(validateCarName)) {
      alert(ERROR_MESSAGE.NAME_LENGTH);
      return;
    }

    $store.game.resetCars();
    carNames.forEach((name) => $store.game.addCar(name));
  };

  const validateCarName = (name) =>
    name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH;

  init();

  return dom;
}
