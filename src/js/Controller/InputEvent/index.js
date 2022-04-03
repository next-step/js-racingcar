import { racingCarInputEvent } from "./racingCarInputEvent.js";
import { racingCountInputEvent } from "./racingCountInputEvent.js";
import { selector } from "../../util/consts.js";

export const init = () => {
  const carForm = selector('.racing-form')
  carForm.addEventListener('submit', event => event.preventDefault())

  const carNameButton = selector('.car-name-button');
  carNameButton.addEventListener('click', racingCarInputEvent.racingCarNameClickEvent)

  const carNameInput = selector('.car-name-input');
  carNameInput.addEventListener('keypress', racingCarInputEvent.racingCarNameKeyboardEvent)
}

export const racingCountEvent = (value) => {
  const racingCountButton = selector('.racing-count-button');
  racingCountButton.addEventListener('click', (event) => racingCountInputEvent.racingCountClickEvent(event, value))
  
  const racingCountInput = selector('.racing-count-input')
  racingCountInput.addEventListener('keypress', (event) => racingCountInputEvent.racingCountKeyboardEvent(event, value))
}

