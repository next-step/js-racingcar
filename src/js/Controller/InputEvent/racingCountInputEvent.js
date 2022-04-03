import { VALIDATE } from "../../util/consts.js";


import Racing from "../../Model/Racing.js";
import convertDisabledAttr from "./commons/convertDisabledAttr.js";
import renderRacingArena from "../../View/Render/renderRacingArena.js";

export const racingCountInputEvent = (function(){
  const formHandler = (target, cars) => {
    const { value } = target.input

    if (Racing.validate.racingCount(value)) return alert(VALIDATE.ALERT_LESS_RACING_COUNT)

    convertDisabledAttr(target)
    renderRacingArena(cars)
    
    // 이벤트 전달
    const racing = new Racing(cars.split(','), value)

  }

  return {
    // 중복제거 => 이걸 상속 받게 클래스로 만들까?
    racingCountClickEvent(event, cars) {
      if (event.target) {
        const target = {
          input: event.target.previousElementSibling,
          button: event.target
        }
        formHandler(target, cars)
      }
    },
  
    racingCountKeyboardEvent(event, cars) {
      if (event.target && event.key === 'Enter') {
        const target = {
          input: event.target,
          button: event.target.nextElementSibling
        }
        formHandler(target, cars)
      }
    },
  }
})()
