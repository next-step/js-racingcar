import InputText from "./InputText.js";
import SubForm from "./SubForm.js";

import { TITLE } from "../../../util/consts.js";


const Fieldset = (name, placeholder) => {
  return `
  <fieldset>
    ${name === 'name' ? `<h1 class="text-center">🏎️ 자동차 경주 게임</h1>` : ''}
    ${name === 'name' ? InputText(TITLE.CAR_NAME) : InputText(TITLE.RACING_COUNT)}
    ${SubForm(name, placeholder)}
  </fieldset>
  `
}

export default Fieldset;
