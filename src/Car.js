const { MESSAGE } = require("../constants/message");

class Car {
  constructor(name) {
    if (name.length > 5) {
      throw new Error(MESSAGE.NAME_LENGTH_ERROR);
    }

    this.name = name;
  }
}

module.exports = { Car };
