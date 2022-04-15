import { $ } from '../dom.js';
import actionMap from '../eventAction.js';
import { racingNumberValidation } from '../validation.js';
import store from '../store/store.js';

function NumberContainer(target) {
  target.innerHTML = template();

  const $racingNumberForm = $('#racing-number-form', target);
  const $racingNumberInput = $('#racing-number', target);
  const $racingNumberBtn = $('#racing-number-btn', target);

  render();
  setEvents();

  function setRacingNumberHandler(event) {
    const racingNumber = $racingNumberInput.valueAsNumber;
    if (
      racingNumberValidation.emptyRacingNumber(racingNumber) ||
      racingNumberValidation.notNumberType(racingNumber) ||
      racingNumberValidation.minRacingNumber(racingNumber)
    )
      return;

    actionMap?.SET_RACING_NUMBER(racingNumber);
    event.preventDefault();
  }

  function setEvents() {
    $racingNumberForm.addEventListener('submit', setRacingNumberHandler);
  }

  function render() {
    const { racingNumber } = store.getState();
    $racingNumberInput.value = racingNumber;
    const isDisabled = racingNumber > 0;

    $racingNumberInput.disabled = isDisabled;
    $racingNumberBtn.disabled = isDisabled;
  }

  function template() {
    return `
	  <fieldset class="num-form">
	    <p>시도할 횟수를 입력해주세요.</p>
	    <form id="racing-number-form" class="d-flex">
		    <input id="racing-number" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
			  <button id="racing-number-btn" type="submit" class="btn btn-cyan">확인</button>
		  </form>
	  </fieldset>
	`;
  }
}

export default NumberContainer;
