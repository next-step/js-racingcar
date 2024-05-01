const MAX_CAR_NAME_LENGTH = 5;
const MOVE_CAR_COUNT = 4;

export class Car {
  #name;
  #position;

  /** 유효성 검사는 함수로 빼서 관리는게 좋을까? */
  constructor(name) {
    if (name.length > MAX_CAR_NAME_LENGTH)
      throw new Error('이름은 5자 이하만 가능합니다.');

    this.#name = name;
    this.#position = 0;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move(randomValue) {
    if (randomValue >= MOVE_CAR_COUNT) {
      this.#position += 1;
    }
  }
}
