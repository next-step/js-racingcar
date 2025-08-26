export class Game {
  #CAR_RACING_TIMES = 5;

  #RACING_DURATION = 1_000;

  constructor(carList) {
    this.carList = carList;
  }

  play() {
    return new Promise((resolve) => {
      for (let i = 0; i < this.#CAR_RACING_TIMES; i += 1) {
        this.carList.forEach((car) => {
          car.goForward();
        });

        let racingStatus = "";
        this.carList.forEach((car) => {
          const { name, xPosition } = car.getCarInfo();

          racingStatus += `${name} : ${"-".repeat(xPosition)}\n`;
        });

        setTimeout(() => {
          console.log(racingStatus);

          const isFinalTime = i === this.#CAR_RACING_TIMES - 1;
          if (isFinalTime) {
            resolve();
          }
        }, this.#RACING_DURATION * i);
      }
    });
  }
}
