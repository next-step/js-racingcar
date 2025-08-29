import Car from "./car.js";

export function makeCarNameList(carNames, separator = ",") {
  if (typeof carNames !== "string") {
    throw new Error("자동차 이름은 string 타입이어야 합니다.");
  }
  if (carNames.length < 1) {
    throw new Error("자동차 이름의 길이는 0보다 커야 합니다.");
  }
  if (carNames.length <= Car.MAX_LENGTH_NAME && !carNames.includes(separator)) {
    return [carNames];
  }
  if (!carNames.includes(separator)) {
    throw new Error("자동차 이름이 형식에 맞지 않습니다.");
  }
  return carNames.split(separator);
}

export function makeCarList(carNameList) {
  if (
    !Array.isArray(carNameList) ||
    !carNameList.every((carName) => typeof carName === "string")
  ) {
    throw new Error("자동차 이름이 형식에 맞지 않습니다.");
  }
  return carNameList.map((carName) => new Car(carName));
}
