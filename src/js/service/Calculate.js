class Calculate {
  getRandomCount() {
    return Math.floor(Math.random() * 10);
  }

  isForwardCondition() {
    return this.getRandomCount() > 4;
  }
}

export default Calculate;
