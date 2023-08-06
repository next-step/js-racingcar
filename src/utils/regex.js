import { MIN_CAR_COUNT, MAX_CAR_NAME_LENGTH } from "../data/constants";

export function validateEmptyName(carList) {
  carList.forEach((car) => {
    if (!car || car.includes(" "))
      throw new Error("빈 값은 입력할 수 없습니다.");
  });
}

export function validateDuplicateName(carList) {
  const copyCarList = [...new Set([...carList])];

  if (carList.length !== copyCarList.length) {
    throw new Error("중복되는 이름은 입력할 수 없습니다.");
  }
}

export function validateNameLength(carList) {
  carList.forEach((car) => {
    if (car.length > MAX_CAR_NAME_LENGTH) {
      throw new Error(
        `이름의 길이는 ${MAX_CAR_NAME_LENGTH}자를 넘길 수 없습니다.`
      );
    }
  });
}

export function validateCarCount(carList) {
  if (carList.length < MIN_CAR_COUNT) {
    throw new Error(`${MIN_CAR_COUNT}개 이상의 자동차를 입력해주세요.`);
  }
}

export default {
  validateEmptyName,
  validateDuplicateName,
  validateNameLength,
  validateCarCount,
};
