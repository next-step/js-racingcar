import { app_div } from "./index.js"
import { MESSAGE, INPUT_SECTION, NAME } from "./constant.js";
import { addInputCountUI } from "./setCount.js";

export let cars;

export const addInputNameUI = () => {
    const input_section = INPUT_SECTION.NAMES;
    app_div.insertAdjacentHTML("beforeend", input_section);
    const div_carname = app_div.querySelector("#carname");
    div_carname.addEventListener("click", setCarName);
  };
  
  const setCarName = ({ target }) => {
    const div_carname = app_div.querySelector("#carname");
    const names = div_carname.querySelector("input").value;
    const btn = div_carname.querySelector("button");
    cars = [];
    if (target == btn) {
      cars = names.split(",").map((x) => x.trim());
      for (let i = 0; i < cars.length; i++){
          if (!(NAME.MIN <= cars[i].length && cars[i].length <= NAME.MAX)){
            alert(MESSAGE.CAR_NAME);
            return;
          }
      }
      btn.setAttribute("disabled", true);
      addInputCountUI();
    }
  };
  