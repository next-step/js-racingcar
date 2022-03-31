import Racing from "../../Model/Racing.js";
import { selector, VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";
import Fieldset from "../../View/Component/Form/Fieldset.js";
import Form from "../../View/Component/Form/Form.js";


export const RacingInitEvent = (event) => {
  render(event.target, Component.create(Form()))
}
export class RacingEvent {
  
  static carNameClickEvent(event) {
    if (event.target) {
      const target = [event.target.previousElementSibling, event.target]
      RacingEvent.formHandler(target)
    }
  }

  static carNameKeyboardEvent(event) {
    if (event.target && event.key === 'Enter') {
      const target = [event.target, event.target.nextElementSibling]
      RacingEvent.formHandler(target)
    }
  }


  static formHandler(target) {
    
    const [input, button] = target
    const { value } = input
    
    if (Racing.validate.carNameLength(value)) return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME)
    
    input.disabled = true
    button.disabled = true
    input.setAttribute('value', value)
    
    render(selector('.racing-form'), Component.create(Fieldset('count', '시도 횟수')))
  }

  static test() {
    console.log('test!')
  }
}
