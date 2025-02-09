import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import {RandomAcceleration} from "../domain/Acceleration.js";
import {Car} from "../domain/Car.js";
import {Race} from "../domain/Race.js";

class RacingCarController {
    constructor() {
        this.inputView = new InputView();
        this.outputView = new OutputView();
    }

    async run() {
        const carsNames = await this.inputView.askCarNames();
        const rounds = await this.inputView.askRounds();
        const cars = Car.createCars(carsNames, new RandomAcceleration());
        const race = new Race(cars, rounds);
        const raceResult = race.start();

        this.outputView.printRaceResult(raceResult);
    }
}

export default RacingCarController;
