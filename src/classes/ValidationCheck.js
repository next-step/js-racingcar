import { MAX_CAR_NAME_LENGTH, MIN_CAR_COUNT } from "../data/constants";

export default class ValidationCheck {
  validateEmptyName(carList) {
    carList.forEach((car) => {
      if (car === "") throw new Error("빈 값은 입력할 수 없습니다.");
    });
  }

  validateDuplicateName(carList) {
    const copyCarList = [...new Set([...carList])];

    if (carList.length !== copyCarList.length) {
      throw new Error("중복되는 이름은 입력할 수 없습니다.");
    }
  }

  validateNameLength(carList) {
    carList.forEach((car) => {
      if (car.length > MAX_CAR_NAME_LENGTH) throw new Error("이름의 길이는 5자를 넘길 수 없습니다.");
    });
  }

  validateCarCount(carList) {
    if (carList.length < MIN_CAR_COUNT) throw new Error("2개 이상의 자동차를 입력해주세요.");
    return carList;
  }
}
