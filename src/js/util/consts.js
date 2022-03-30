export const selector = (name) => document.querySelector(name);
export const selectorAll = (name) => document.querySelectorAll(name);

export const VALIDATE = {
  ALERT_WRONG_RACING_CAR_NAME : '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
}

export const CAR_NAME_TITLE = `5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
예시) EAST, WEST, SOUTH, NORTH`


export const TITLE = {
  CAR_NAME: `5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
  예시) EAST, WEST, SOUTH, NORTH`,
  RACING_COUNT: `시도할 횟수를 입력해주세요.`
};
