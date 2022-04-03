import Racing from "../../Model/Racing.js";
import { selector, VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";
import Fieldset from "../../View/Component/Form/Fieldset.js";

import convertDisabledAttr from "./commons/convertDisabledAttr.js";
import { racingCountEvent } from "./index.js";


export const racingCarInputEvent = (function(){
  // form handler가 하는일이 너무 많다 리팩토링 요망 (event를 여기서 설정하고 싶지 않은데.. 방법이 없을까..?)

  const formHandler = (target) => {
    
    const { value } = target.input

    if (Racing.validate.carNameLength(value)) return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME)

    convertDisabledAttr(target)
    render(selector('.racing-form'), Component.create(Fieldset('count', '시도 횟수')))


    // 이벤트를 여기서 정의하고 싶지 않은데..
    racingCountEvent(value)
  }

  return {
    racingCarNameClickEvent(event) {
      if (event.target) {
        const target = {
          input: event.target.previousElementSibling,
          button: event.target
        }
        formHandler(target)
      }
    },
  
    racingCarNameKeyboardEvent(event) {
      if (event.target && event.key === 'Enter') {
        const target = {
          input: event.target,
          button: event.target.nextElementSibling
        }
        formHandler(target)
      }
    },
  }
})()
