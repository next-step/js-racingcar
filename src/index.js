import Race from "./domain/Race.js";
import View from "./view/view.js";

const carNames = await View.getCarNames();
const race = new Race(carNames);
race.start();