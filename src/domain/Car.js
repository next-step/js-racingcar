import { CAR_MOVE_CONDITION } from "./RacingConfig";

export class Car {
  constructor(name) {
    if (name.length > 5) {
      throw new Error("자동차의 이름은 5글자 이하여야합니다.");
    }
    this.name = name;
  }
}
