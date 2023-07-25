import { ERROR_MESSAGE, MAXIMUN_NAME_LENGTH } from "../constants";

class Car {
  name;
  constructor(name) {
    this.validation(name);
    this.name = name;
  }

  validation(name) {
    if (name.length > MAXIMUN_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.EXCEED_MAXIMUM_NAME_LENGTH);
    }
  }
}

export default Car;
