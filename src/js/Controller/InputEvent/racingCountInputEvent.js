import { VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";
import { selector } from "../../util/consts.js";

import Racing from "../../Model/Racing.js";
import RacingGame from "../../View/Component/Game/RacingGame.js";

export const racingCountInputEvent = (function(){
  const formHandler = (target) => {
    const [input, button] = target
    const { value } = input

    if (Racing.validate.racingCount(value)) return alert(VALIDATE.ALERT_LESS_RACING_COUNT)

    // 중복 리팩토링 요망
    input.disabled = true
    button.disabled = true
    input.setAttribute('value', value)

    const carNameInput = selector('.car-name-input')

    render(
      selector('#app'),
      Component.create(RacingGame(carNameInput.value, 'wait'))
    )
    
    // 이벤트 전달
    
  }

  return {
    racingCountClickEvent(event) {
      if (event.target) {
        const target = [event.target.previousElementSibling, event.target]
        formHandler(target)
      }
    },
  
    racingCountKeyboardEvent(event) {
      if (event.target && event.key === 'Enter') {
        const target = [event.target, event.target.nextElementSibling]
        formHandler(target)
      }
    },
  }
})()
