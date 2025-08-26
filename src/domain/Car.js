export class Car {
  #CAR_RACING_TIMES = 5;

  #RACING_DURATION = 1_000;

  #name;

  #xPosition = 0;

  constructor(name) {
    this.#name = name;
  }

  getCarInfo() {
    return {
      name: this.#name,
      xPosition: this.#xPosition,
    };
  }

  async play() {
    return new Promise((resolve) => {
      for (let i = 0; i < this.#CAR_RACING_TIMES; i += 1) {
        this.goForward();
        const { xPosition } = this.getCarInfo();

        setTimeout(() => {
          console.log(`${this.#name} : ${"-".repeat(xPosition)}\n`);

          const isFinalTime = i === this.#CAR_RACING_TIMES - 1;
          if (isFinalTime) {
            resolve();
          }
        }, this.#RACING_DURATION * i);
      }
    });
  }

  goForward() {
    this.#go(1);
  }

  #go(amount) {
    this.#xPosition += amount;
  }
}
