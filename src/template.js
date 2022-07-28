import { $ } from "./dom.js";
import { SELECTORS } from "./constants.js";

export const templateSpinner = `<div class="spinners d-flex justify-center mt-3">
                                  <div class="relative spinner-container">
                                    <span class="material spinner"></span>
                                  </div>
                                </div>`;

export const templateForward = `<div class="forward-icon mt-2">⬇️️</div>`;

export const createTemplateCarPlayer = (carNames) => {
  return carNames.map(
    (name) => `<div class="car">
                  <div class="car-player">${name}</div>
                  ${templateSpinner}
                </div>`
  );
};

export const createTemplateResult = (results) => {
  return results.map(
    (result) => `<div>
                  <h2>🏆 최종 우승자: ${result} 🏆</h2>
                  <div class="d-flex justify-center">
                    <button type="button" class="btn btn-cyan">다시 시작하기</button>
                  </div>
                </div>`
  );
};

// const createTemplateForward = (number) => {
//   const res = "";

//   for (let i = 0; i < number; i++) {
//     res += templateForward;
//   }
//   return res + templateSpinner;
// };
