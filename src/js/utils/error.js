export const ERROR_TYPE = {
  INVALID_NAME_LENGTH: "INVALID_NAME_LENGTH",
  INVALID_TRY_SIZE: "INVALID_TRY_SIZE",
}

export const ERROR = {
  INVALID_NAME_LENGTH: () => alert(ERROR_MESSAGE.INVALID_NAME_LENGTH),
  INVALID_TRY_SIZE: () => alert(ERROR_MESSAGE.INVALID_TRY_SIZE)
}

export const ERROR_MESSAGE = {
  INVALID_NAME_LENGTH: "유효하지 않은 이름 길이입니다. 자동차 이름은 1~5자 이내로 입력해주세요.",
  INVALID_TRY_SIZE: "입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1회 이상이어야합니다."
}


export const ERROR_CHECK = {
  NAME_LENGTH: name => name && 1 <= name.length && name.length <= 5 ? name.trim() : ERROR.INVALID_NAME_LENGTH(),
  TRY_SIZE: tryNum => tryNum && is_numeric(tryNum) && 1 <= parseInt(tryNum) ? parseInt(tryNum) : ERROR.INVALID_TRY_SIZE()
}

function is_numeric(str){
  return /^\d+$/.test(str);
}