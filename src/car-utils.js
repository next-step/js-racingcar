export function makeCarNameList(carNames, separator = ",") {
  if (
    typeof carNames !== "string" ||
    carNames.length === 0 ||
    !carNames.includes(separator)
  ) {
    throw new Error("자동차 이름이 형식에 맞지 않습니다.");
  }
  return carNames.split(separator);
}
