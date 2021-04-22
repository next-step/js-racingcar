import { $All, progressTitle, setting } from "../utils/constant.js";
import { timerCheck } from "./timerCheck.js";

const startRacing = (tryNumber, carName) => {
  let count = 0;
  carName.map((val) => (progressTitle.innerHTML += setting(val)));
  const carMovingDom = $All(".car-player");
  timerCheck(count, carName, tryNumber, carMovingDom);
};

export { startRacing };
