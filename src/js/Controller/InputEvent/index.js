import { racingCarInputEvent } from "./racingCarInputEvent.js";
import { selector } from "../../util/consts.js";

const init = () => {
  const carForm = selector('.racing-form')
  carForm.addEventListener('submit', event => event.preventDefault())

  const carNameButton = selector('.car-name-button');
  carNameButton.addEventListener('click', racingCarInputEvent.racingCarNameClickEvent)

  const carNameInput = selector('.car-name-input');
  carNameInput.addEventListener('keypress', racingCarInputEvent.racingCarNameKeyboardEvent)
}

export default init;
