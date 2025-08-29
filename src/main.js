import { makeCarList, makeCarNameList } from "./car-utils.js";
import Car from "./car.js";
import { readLineAsync } from "./input.js";

const carNames = await readLineAsync("경주할 자동차 이름을 입력하세요.\n");
const carNameList = makeCarNameList(carNames);
const carList = makeCarList(carNameList);
