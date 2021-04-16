import { app_div } from "./index.js"
import { MESSAGE, INPUT_SECTION } from "./constant.js";
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
      let flag = 1;
      cars = names.split(",").map((x) => x.trim());
      cars.forEach((x) => {
        if (flag && !(1 <= x.length && x.length <= 5)) {
          alert(MESSAGE.CAR_NAME);
          flag = 0;
        }
      });
      if (!flag) return;
      btn.setAttribute("disabled", true);
      addInputCountUI();
    }
  };