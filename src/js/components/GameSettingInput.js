import { createElement } from "../utils/utils.js";
import $store from "../store/index.js";

import {
  ERROR_MESSAGE,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from "../utils/constnats.js";

const template = `
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
        <input type="number" class="racing-times-input w-100 mr-2" placeholder="시도 횟수" />
        <button type="button" class="racing-times-submit btn btn-cyan">확인</button>
      </div>
    </fieldset>
  </form>
`;

export default function GameSettingInput(target, { startRace }) {
  const dom = createElement(target, template);
  const carNameInput = dom.querySelector(".car-name-input");
  const carNameSubmit = dom.querySelector(".car-name-submit");
  const racingTimesInput = dom.querySelector(".racing-times-input");
  const racingTimesSubmit = dom.querySelector(".racing-times-submit");

  const init = () => {
    initEventListener();
  };

  const initEventListener = () => {
    carNameInput.addEventListener("keypress", onKeypressCarNameInput);
    carNameSubmit.addEventListener("click", submitCarName);
    racingTimesInput.addEventListener("keypress", onKeypressRacingTimesInput);
    racingTimesSubmit.addEventListener("click", submitRacingTimes);
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

    $store.game.reset();
    carNames.forEach((name) => $store.game.addCar(name));
  };

  const validateCarName = (name) =>
    name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH;

  const onKeypressRacingTimesInput = ({ target, key }) => {
    if (key !== "Enter" || !target.value) {
      return;
    }

    submitRacingTimes();
  };

  const submitRacingTimes = () => {
    const racingTimes = racingTimesInput.value.trim();
    if (Number.isInteger(racingTimes) || racingTimes < 1) {
      alert(ERROR_MESSAGE.RACING_TIMES);
      return;
    }

    startRace(racingTimes);
  };

  init();

  return dom;
}
