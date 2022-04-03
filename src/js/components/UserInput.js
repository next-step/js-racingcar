import CarsInput from "./CarsInput.js";
import CountInput from "./CountInput.js";

export default function UserInput() {
  render();
  organizeComponents();
}

const render = () => {
  const target = document.querySelector("#user-input-component");
  target.innerHTML = `
    <fieldset>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <div id="cars-input-component"></div>
    </fieldset>
    <fieldset>
        <div id="count-input-component"></div>
    </fieldset>
    `;
};

const organizeComponents = () => {
  CarsInput();
  CountInput();
};
