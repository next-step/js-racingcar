import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import {RandomAcceleration} from "./domain/Acceleration.js";
import {Car} from "./domain/Car.js";
import {Race} from "./domain/Race.js";

async function main() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const carsNames = await inputView.askCarNames();
    const rounds = await inputView.askRounds();
    const cars = Car.createCars(carsNames, new RandomAcceleration());
    const race = new Race(cars, rounds);
    const raceResult = race.start();

    outputView.printRaceResult(raceResult);
}

main();
