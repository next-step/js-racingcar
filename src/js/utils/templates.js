import { canMove } from './functions.js';

export const processTemplate = (array) => {
	const temp = array
		.map((name) => {
			return `
        <div class="car-player-container mr-2">
          <div class="car-player">${name}</div>
          <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div>
    `;
		})
		.join("");
  return `
    <div class="mt-4 d-flex">
      ${temp}
    </div>
  `;
};

export const processingTemplate = () => {
  if (canMove()) {
    return `
    <div class="forward-icon mt-2">⬇️️</div>
  `;
  } else {
    return ``; 
  }
}

export const showWinnersTemplate = (array) => {
  return `🏆 최종 우승자: ${array.join(", ")} 🏆`;
}
