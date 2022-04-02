import Racing from "../../Model/Racing.js";
import { selector, VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";
import Fieldset from "../../View/Component/Form/Fieldset.js";
import { racingCountInputEvent } from "./racingCountInputEvent.js";


export const racingCarInputEvent = (function(){
  // form handler가 하는일이 너무 많다 리팩토링 요망 (event를 여기서 설정하고 싶지 않은데.. 방법이 없을까..?)
  const formHandler = (target) => {
    const [input, button] = target
    const { value } = input

    if (Racing.validate.carNameLength(value)) return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME)

    input.disabled = true
    button.disabled = true
    input.setAttribute('value', value)
    
    render(selector('.racing-form'), Component.create(Fieldset('count', '시도 횟수')))

    const racingCountButton = selector('.racing-count-button');
    racingCountButton.addEventListener('click', racingCountInputEvent.racingCountClickEvent)

    const racingCountInput = selector('.racing-count-input')
    racingCountInput.addEventListener('keypress', racingCountInputEvent.racingCountKeyboardEvent)
  }

  return {
    racingCarNameClickEvent(event) {
      if (event.target) {
        const target = [event.target.previousElementSibling, event.target]
        formHandler(target)
      }
    },
  
    racingCarNameKeyboardEvent(event) {
      if (event.target && event.key === 'Enter') {
        const target = [event.target, event.target.nextElementSibling]
        formHandler(target)
      }
    },
  }
})()
