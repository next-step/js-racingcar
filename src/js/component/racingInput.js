import { $ } from "../utils/dom.js";

export default function RacingInput(app) {
  const $input = $("#user-input-component");
  const $tryNumInput = $("#section-race-times");
  // tryNumInput.setAttribute("class", "hidden");

  const onKeyHandler = event => {
    
  }

  $input.addEventListener("keydown", onKeyHandler);
}