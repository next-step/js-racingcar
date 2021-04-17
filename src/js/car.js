class Car {
  constructor(name, targetEl) {
    this.name = name;
    this.targetEl = targetEl;
    this.forwardCount = 0;
  }

  run(times) {
    let tryCount = 0;
    const race = setInterval(() => {
      tryCount++;

      const randomNum = Math.floor(Math.random() * 10);
      const forward = randomNum > 3;

      if (forward) this.goForward();

      if (tryCount === times) {
        clearInterval(race);
      }
    });
  }

  goForward() {
    this.forwardCount++;
    console.log('고고');
  }
}
