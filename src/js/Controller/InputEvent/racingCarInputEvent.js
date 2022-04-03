import Racing from "../../Model/Racing.js";
import { VALIDATE } from "../../util/consts.js";
import renderCountForm from "../../View/Render/renderCountForm.js";


import convertDisabledAttr from "./commons/convertDisabledAttr.js";
import { racingCountEvent } from "./index.js";


export const racingCarInputEvent = (function(){
  // form handler가 하는일이 너무 많다 리팩토링 요망 (event를 여기서 설정하고 싶지 않은데.. 방법이 없을까..?)

  const formHandler = (target) => {    
    const { value } = target.input

    if (Racing.validate.carNameLength(value)) return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME)

    convertDisabledAttr(target)

    renderCountForm()
    
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
