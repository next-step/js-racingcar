class Calculate {
  static #getRandomCount() {
    return Math.floor(Math.random() * 10);
  }

  static isForwardCondition() {
    return Calculate.#getRandomCount() > 4;
  }
}

export default Calculate;
