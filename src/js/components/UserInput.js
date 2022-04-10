export default class UserInput {
  constructor(target, onSubmit) {
    this.#render(target);
    this.#setVisibility(this.#hasCarName);
    this.#setEvent(onSubmit);
  }

  #hasCarName = false;
  #hasCount = false;

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

  #setVisibility = (hasCarName) => {
    const carsInputFieldElement = document.querySelector(
      "#cars-input-form > fieldset"
    );
    const countInputFormElement = document.querySelector("#count-input-form");
    if (hasCarName) {
      countInputFormElement.hidden = false;
      carsInputFieldElement.setAttribute("disabled", true);
    } else {
      countInputFormElement.hidden = true;
    }
  };

  #setEvent = (onSubmit) => {
    const carsInputForm = document.querySelector("#cars-input-form");
    carsInputForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(carsInputForm);
      const carNames = formData.get("cars-input");

      this.#hasCarName = carNames ? true : false;
      this.#carNames = carNames;

      this.#setVisibility(this.#hasCarName);
    });

    const countInputForm = document.querySelector("#count-input-form");
    countInputForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(countInputForm);
      const count = formData.get("count-input");

      this.#hasCount = count ? true : false;
      this.#count = count;

      onSubmit(this.#carNames, this.#count);
    });
  };
}
