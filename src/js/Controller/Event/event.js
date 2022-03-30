import Racing from "../../Model/Racing.js";
import { VALIDATE } from "../../util/consts.js";
import { Component, render } from "../../View/index.js";
import Form from "../../View/Component/Form/Form.js";

export const RacingInitEvent = (event) => {
  render(event.target, Component.create(Form()))
}
export class RacingFormEvent {
  
  static carNameHandler(event) {
    event.preventDefault()
    const [input, button] = event.target

    if (Racing.validate.carNameLength(input.value)) return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME)
    
    
  }
}
