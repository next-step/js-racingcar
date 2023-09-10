import { ERROR_MESSAGE, MAXIMUN_NAME_LENGTH } from "../constants";

class Car {
  name;
  position;
  constructor(name) {
    this.validation(name);
    this.name = name;
    this.position = 0;
  }

  validation(name) {
    if (name.length > MAXIMUN_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.EXCEED_MAXIMUM_NAME_LENGTH);
    }
  }

  move() {
    this.position += 1;
  }
}

export default Car;
