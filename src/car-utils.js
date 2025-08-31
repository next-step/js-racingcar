import Car from "./car.js";

export function makeCarNameList(carNames, separator = ",") {
  if (typeof carNames !== "string") {
    throw new Error("자동차 이름은 string 타입이어야 합니다.");
  }
  if (
    inRange(carNames.length, {
      min: Car.MIN_LENGTH_NAME,
      max: Car.MAX_LENGTH_NAME,
    }) &&
    !carNames.includes(separator)
  ) {
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

function inRange(value, { min, max }) {
  return min <= value && value <= max;
}
