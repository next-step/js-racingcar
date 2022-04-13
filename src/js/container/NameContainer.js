import { $ } from '../dom.js';
import actionMap from '../eventAction.js';
import { carNameValidation } from '../validation.js';
import store from '../store/store.js';

function NameContainer(target) {
  target.innerHTML = template();

  const $carNameForm = $('#car-name-form', target);
  const $carNameInput = $('#car-name', target);
  const $carNameBtn = $('#car-name-btn', target);

  render();
  setEvents();

  function setCarNameHandler(event) {
    const carName = $carNameInput.value;
    if (
      carNameValidation.emptyCarName(carName) ||
      carNameValidation.carNameMaxLength(carName)
    )
      return;
    actionMap?.SET_CARS_NAME(carName.split(','));
    event.preventDefault();
  }

  function setEvents() {
    $carNameForm.addEventListener('submit', setCarNameHandler);
  }

  function render() {
    const { cars } = store.getState();
    $carNameInput.value = cars.join(',');
    const isDisabled = cars.length > 0;

    $carNameInput.disabled = isDisabled;
    $carNameBtn.disabled = isDisabled;
  }

  function template() {
    return `
			<fieldset class="name-form">
				<h1 class="text-center">🏎️ 자동차 경주 게임</h1>
				<p>
					5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
					예시) EAST, WEST, SOUTH, NORTH
				</p>
				<form id="car-name-form" class="d-flex">
					<input id="car-name" type="text" class="w-100 mr-2"  placeholder="자동차 이름" />
					<button  type="submit" id="car-name-btn" class="btn btn-cyan">확인</button>
				</form>
			</fieldset>
		`;
  }
}

export default NameContainer;
