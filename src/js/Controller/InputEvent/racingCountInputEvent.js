import { VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";
import { selector } from "../../util/consts.js";

import Racing from "../../Model/Racing.js";
import RacingGame from "../../View/Component/Game/RacingGame.js";
import convertDisabledAttr from "./commons/convertDisabledAttr.js";

export const racingCountInputEvent = (function(){
  const formHandler = (target, cars) => {
    const { value } = target.input

    if (Racing.validate.racingCount(value)) return alert(VALIDATE.ALERT_LESS_RACING_COUNT)

    convertDisabledAttr(target)

    const racing = new Racing(cars.split(','), value)
    console.log(racing)

    render(
      selector('#app'),
      Component.create(RacingGame(cars, 'wait'))
    )
    
    // 컴포넌트 생성 및 이벤트 전달
    
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
