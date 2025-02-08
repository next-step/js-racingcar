import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import Race from "./domain/Race.js";

async function main() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const cars = await inputView.askCarNames();
    const race = new Race(cars);
    const raceResult = race.start();
    outputView.printRaceResult(raceResult);
}

main();
