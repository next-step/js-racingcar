import CarName from "./CarName.js";
import InputText from "./InputText.js";
import { CAR_NAME_TITLE } from "../../util/consts.js";
import Racing from "../../Domain/Racing.js";
import { selector } from "../../util/consts.js";


const Fieldset = () => {

  return `
  <fieldset>
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    ${InputText(CAR_NAME_TITLE)}
    ${CarName()}
  </fieldset>
  `
}

export default Fieldset;
