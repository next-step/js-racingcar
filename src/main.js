import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import Race from "./domain/Race.js";
import {RandomAcceleration} from "./domain/Acceleration.js";
import {Car} from "./domain/Car.js";

async function main() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const carsNames = await inputView.askCarNames();
    const cars = Car.createCars(carsNames, new RandomAcceleration());
    const race = new Race(cars);
    const raceResult = race.start();
    outputView.printRaceResult(raceResult);
}

main();
