import { selector } from "../../util/consts.js";
import { render, Component } from "../render.js"
import Fieldset from "../Component/Form/Fieldset.js";

const renderCountForm = () => {
  render(
    selector('.racing-form'),
    Component.create(Fieldset('count', '시도 횟수'))
  )
}

export default renderCountForm;
