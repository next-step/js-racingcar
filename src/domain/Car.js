export const MAX_CAR_NAME_LENGTH = 5;

export class Car {
  name;
  position = 0;

  constructor(name) {
    this.validate(name);
    this.name = name;
  }

  move() {
    this.position++;
  }

  validate(name) {
    if (typeof name !== "string") {
      throw new Error("잘못된 입력입니다.");
    }

    if (name === "") {
      throw new Error("잘못된 입력입니다.");
    }

    if (name.length > MAX_CAR_NAME_LENGTH) {
      throw new Error(
        `자동차의 이름은 ${MAX_CAR_NAME_LENGTH}글자 이하여야합니다.`
      );
    }
  }

  copy() {
    const copy = new Car(this.name);
    copy.position = this.position;
    return copy;
  }
}
