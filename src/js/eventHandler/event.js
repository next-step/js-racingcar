import { carButtonDom, tryButtonDom } from "../utils/constant.js";
import { carButtonHandler, tryButtonHandler } from "./handler.js";

const carButtonEvent = carButtonDom.addEventListener("click", carButtonHandler);
const tryButtonEvent = tryButtonDom.addEventListener("click", tryButtonHandler);

export { carButtonEvent, tryButtonEvent };
