import { CAR_MOVE_CONDITION } from "../const/RacingConfig";

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

    if (name.length > 5) {
      throw new Error("자동차의 이름은 5글자 이하여야합니다.");
    }
  }

  copy() {
    const copy = new Car(this.name);
    copy.position = this.position;
    return copy;
  }
}
