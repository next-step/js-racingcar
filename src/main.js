import { makeCarList, makeCarNameList } from "./car-utils.js";
import { readLineAsync } from "./input.js";
import { printResult } from "./output.js";
import { Racing } from "./racing.js";

const carName = await readLineAsync("경주할 자동차 이름을 입력하세요.\n");
const carNameList = makeCarNameList(carName);
const carList = makeCarList(carNameList);
const racing = new Racing({ carList: carList });
racing.run();
printResult(racing);
