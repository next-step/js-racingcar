export const MIN_CAR_NAME_LENGTH = 1;
export const MAX_CAR_NAME_LENGTH = 5;
export const MIN_RACING_COUNT = 1;
export const GAME_PROCESS_DELAY = 1000;
export const WINNER_CONGURATULATION_DELAY = 2000;

export const MESSAGE = {
  INVALID_NAME_LENGTH: `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${MIN_CAR_NAME_LENGTH}자 이상 ${MAX_CAR_NAME_LENGTH}자 이하만 가능합니다.`,
  NAME_CAN_NOT_BE_BLANK: "공백 만으로는 이름을 구성할 수 없습니다.",
  INVALID_RACING_COUNT: `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${MIN_RACING_COUNT} 이어야 합니다`,
  CELEBRATION: `🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇`,
};

export const PROGRESS = {
  CARNAME: (name) => `<div class="car-player mr-2">${name}</div>`,
  WAIT: `<div class="d-flex justify-center mt-4 spinner-icon hidden">
          <div class="relative spinner-container">
            <span id="spinner-icon"class="material spinner" hidden></span>
          </div>
        </div>`,

  MOVE: `<div class="forward-icon mt-2">⬇️️</div>`,
};
