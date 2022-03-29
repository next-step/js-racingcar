import { selector } from "../../util/consts.js";
import Racing from "../../Domain/Racing.js";
import { VALIDATE } from "../../util/consts.js";

const Event = () => {
  const carNameForm = selector('.car-name-form')
  
  const carNameFormHandler = (event) => {
    event.preventDefault()
    const [input, button] = event.target

    if (Racing.validate.carNameLength(input.value)) return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME)
  }
  
  carNameForm.addEventListener('submit', carNameFormHandler)
}

export default Event;
