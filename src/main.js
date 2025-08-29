import Car from "./car.js";
import { readLineAsync } from "./input.js";

const carName = await readLineAsync("경주할 자동차 이름을 입력하세요.\n");
const car = new Car(carName);

