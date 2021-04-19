import {carButtonDom, tryButtonDom} from "../source/source.js";
import {carButtonHandler, tryButtonHandler} from "./handler.js";

const carButtonEvent = carButtonDom.addEventListener('click',carButtonHandler);

const tryButtonEvent = tryButtonDom.addEventListener('click',tryButtonHandler);

export {carButtonEvent,tryButtonEvent};
