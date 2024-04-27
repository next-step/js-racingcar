import Race from "./domain/index.js";
import View from "./view/view.js";

const view = new View();
const carNames = view.getCarNames();
const race = new Race(carNames);


