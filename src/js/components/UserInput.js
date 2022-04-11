import { isAllCarNameValid } from "../validation.js";
import { ALERT_STRING } from "../constant.js";

export default class UserInput {
  constructor(target, onSubmit) {
    this.#render(target);
    this.#setVisibility();
    this.#setEvent(onSubmit);
  }

  #carNames;
  #count;

  #render = (target) => {
    target.innerHTML = `
    <div class="d-flex justify-center mt-5">
      <div>
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <form id="cars-input-form">
          <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
          </p>
          <fieldset class="d-flex">
            <input type="text" name="cars-input" class="w-100 mr-2" placeholder="자동차 이름" />
            <button type="submit" class="btn btn-cyan">확인</button>
          </fieldset>
        </form>
        <form id="count-input-form">
          <p>시도할 횟수를 입력해주세요.</p>
          <fieldset class="d-flex">
            <input type="number" name="count-input" class="w-100 mr-2" placeholder="시도 횟수" />
            <button type="submit" class="btn btn-cyan">확인</button>
          </fieldset>
        </form>
      </div>
    </div>
        `;
  };

  #setVisibility = () => {
    const hasCarName = this.#carNames ? true : false;
    const hasCount = this.#count ? true : false;
    const carsInputFieldElement = document.querySelector(
      "#cars-input-form > fieldset"
    );
    const countInputFormElement = document.querySelector("#count-input-form");
    const countInputFieldElement = countInputFormElement.lastElementChild;
    if (hasCarName) {
      countInputFormElement.hidden = false;
      carsInputFieldElement.setAttribute("disabled", true);
    } else {
      countInputFormElement.hidden = true;
    }
    if (hasCount) {
      countInputFieldElement.setAttribute("disabled", true);
    }
  };

  #setEvent = (onSubmit) => {
    const carsInputForm = document.querySelector("#cars-input-form");
    carsInputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#submitCars(carsInputForm);
    });

    const countInputForm = document.querySelector("#count-input-form");
    countInputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#submitCount(countInputForm);

      // 컴포넌트 최종 form submit
      onSubmit(this.#carNames, this.#count);
    });
  };

  #submitCars = (form) => {
    const formData = new FormData(form);
    const carNames = formData.get("cars-input").split(",");
    const isValid = isAllCarNameValid(carNames);
    if (!isValid) {
      window.alert(ALERT_STRING.INVALID_CAR_NAME);
      form.reset();
      return;
    }
    this.#carNames = carNames;
    this.#setVisibility();
  };

  #submitCount = (form) => {
    const formData = new FormData(form);
    this.#count = formData.get("count-input");
    this.#setVisibility();
  };
}
