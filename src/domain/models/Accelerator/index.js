export class Accelerator {
  static Bound = { MIN: 0, MAX: 10 };
  static Threshold = 4;

  #lowerBound;
  #upperBound;
  #threshold;

  constructor(
    { lowerBound, upperBound, threshold } = {
      lowerBound: Accelerator.Bound.MIN,
      upperBound: Accelerator.Bound.MAX,
      threshold: Accelerator.Threshold,
    },
  ) {
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
    this.#threshold = threshold;
  }

  accelerate() {
    return getRandomInt(this.#lowerBound, this.#upperBound) >= this.#threshold;
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
