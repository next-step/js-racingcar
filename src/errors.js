export class CarNameError extends Error {
  constructor(message) {
    super(message);
    this.name = "CarNameError";
  }
}

export class RaceCarCountError extends Error {
  constructor(message) {
    super(message);
    this.name = "RaceCarCountError";
  }
}

export class RaceLapCountError extends Error {
  constructor(message) {
    super(message);
    this.name = "RaceLapCountError";
  }
}

export class RaceSetupError extends Error {
  constructor(message) {
    super(message);
    this.name = "RaceSetupError";
  }
}
