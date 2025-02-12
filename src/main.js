import { MAX_LENGTH } from "./constants/index.js";
import Race from "./services/race.js";

// export default function RaceGame(input) {
//   // constructor(input) {
//   //   const parser = new ParseCarNames(input);
//   //   const carNames = parser.parse();
//   //   this.carNames = carNames;
//   //   this.cars = carNames.map((carName) => new Car(carName));
//   // }
// }

const race = new Race("boky");
console.log(race.start());
