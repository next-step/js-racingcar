import { $ } from "./dom.js";
import { SELECTORS } from "./constants.js";

export const templateSpinner = `<div class="spinners d-flex justify-center mt-3">
                                  <div class="relative spinner-container">
                                    <span class="material spinner"></span>
                                  </div>
                                </div>`;

export const templateForward = `<div class="forward-icon mt-2">⬇️️</div>`;

export const createTemplateCarPlayer = ($input) => {
  return $input.value.split(",").map(
    (name) => `<div class="car">
                  <div class="car-player">${name}</div>
                  <div class="spinners d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                      <span class="material spinner"></span>
                    </div>
                  </div>
                </div>`
  );
};
