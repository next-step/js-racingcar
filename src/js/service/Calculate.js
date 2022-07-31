class Calculate {
  static #getRandomCount() {
    return Math.floor(Math.random() * 10);
  }

  isForwardCondition() {
    return Calculate.#getRandomCount() > 4;
  }
}

export default Calculate;
