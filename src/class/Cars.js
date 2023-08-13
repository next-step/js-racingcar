import Car from "./Car";
import Validator from "./Validator";

export default class Cars {
  #cars = [];
  #DEFAULT_RACING_ROUND_NUMBER = 5;
  #roundNumber = this.#DEFAULT_RACING_ROUND_NUMBER;
  #advanceConditions;
  #validateRoundNumber = Validator.validateRoundNumber;
  #validateCarNames = Validator.validateCarNames;
  GAME_STEP = Object.freeze({
    SET_CARS: "SET_CARS",
    SET_ROUND_NUMBER: "SET_ROUND_NUMBER",
    EXECUTE_ROUND: "EXECUTE_ROUND",
    AWARDS: "AWARDS",
  });
  #CAR_NAME_SEPARATOR = ",";
  #nextGameStep = this.GAME_STEP.SET_CARS;

  constructor(advanceConditions) {
    this.#advanceConditions =
      advanceConditions instanceof Array &&
      advanceConditions.every(
        (advanceCondition) => typeof advanceCondition === "function",
      )
        ? advanceConditions
        : [];
  }

  addCar(name) {
    this.#validateCarNames([name], this.getCarNames());

    const car = new Car(name);

    this.#cars.push(car);
  }

  addCars(names) {
    this.#validateCarNames(names, this.getCarNames());

    names.forEach((car) => this.addCar(car));

    this.#nextGameStep = this.GAME_STEP.SET_ROUND_NUMBER;
  }

  initializeCarsFromString(input) {
    const carNameArray = input.split(this.#CAR_NAME_SEPARATOR);

    this.addCars(carNameArray);
  }

  getAllCarStatus() {
    return this.#cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
  }

  getCarNames() {
    return this.#cars.map((car) => car.name);
  }

  executeOneRound(advanceCondition) {
    this.#cars.forEach((car) => car.advance(advanceCondition));
  }

  executeMultipleRounds(afterRoundAction) {
    Array.from({ length: this.#roundNumber }, (_, index) => {
      this.executeOneRound(this.#advanceConditions[index]);

      if (typeof afterRoundAction === "function") {
        afterRoundAction(this.getAllCarStatus());
      }
    });

    this.#nextGameStep = this.GAME_STEP.AWARDS;
  }

  getWinners() {
    const maxDistance = Math.max(...this.#cars.map((car) => car.distance));

    return this.#cars
      .filter((car) => car.distance === maxDistance)
      .map((car) => car.name);
  }

  setRoundNumber(number) {
    this.#validateRoundNumber(number);

    this.#roundNumber = Number(number);

    this.#nextGameStep = this.GAME_STEP.EXECUTE_ROUND;
  }

  get nextGameStep() {
    return this.#nextGameStep;
  }
}
