import Racing from "../../Model/Racing.js";
import { VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";

export const racingCountInputEvent = (function(){
  const formHandler = (target) => {
    const [input, button] = target
    const { value } = input

    if (Racing.validate.racingCount(value)) return alert(VALIDATE.ALERT_LESS_RACING_COUNT)

    console.log('pass')

    // count input & button disabled 부착
    // 이벤트 전달
    // 하위 레이싱 컴포넌트 렌더링
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
