import { setCountdown } from '../utils/index.js';

class Game {
  /** @type {import('../models').Car[]} */
  #cars;

  /** @type {import('../views').TrackView} */
  #track;

  constructor(track) {
    this.#track = track;
  }

  #getRandomScore() {
    return Math.floor(Math.random() * 9);
  }

  setCars(cars) {
    this.#cars = cars;
  }

  start(coin) {
    this.#track.render(this.#cars);

    setCountdown(() => {
      this.#cars.forEach((car) => {
        if (this.#getRandomScore() >= 4) {
          car.move();
        } else {
          car.wait();
        }
      });

      this.#track.render(this.#cars);
    }, coin);
  }
}

export default Game;
