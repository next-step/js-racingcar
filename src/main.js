import { Cars } from "./cars.js";
import { readLineAsync } from "./input.js";
import { printResult, printWinner } from "./output.js";
import { Racing } from "./racing.js";
import { Winner } from "./winner.js";

const carName = await readLineAsync("경주할 자동차 이름을 입력하세요.\n");
const cars = Cars.fromNames(carName);
const racing = new Racing({ cars: cars });
racing.run();
printResult(racing);
const winner = new Winner({ cars: racing.cars });
printWinner(winner);
