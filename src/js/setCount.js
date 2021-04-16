import { app_div } from "./index.js";
import { MESSAGE, INPUT_SECTION } from "./constant.js";
import { addProcessUI } from "./proceedGame.js";

export let runningtime;

export const addInputCountUI = () => {
    const count_field = INPUT_SECTION.COUNT;
    app_div
      .querySelector("#input_form")
      .insertAdjacentHTML("beforeend", count_field);
    const input_count = document.querySelector("#count");
    input_count.querySelector("input").focus();
    input_count.addEventListener("click", setCount);
  };
  
  const setCount = ({ target }) => {
    const count_div = target.parentNode;
    const value = count_div.querySelector("input").value;
    const btn = count_div.querySelector("button");
    runningtime = 0;
    if (target == btn) {
      runningtime = value;
      if (runningtime <= 0) {
        alert(MESSAGE.RUN_TIME);
        return;
      }
      btn.setAttribute("disabled", true);
      addProcessUI();
    }
  };