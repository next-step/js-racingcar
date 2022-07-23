import { CarFactory } from "./CarFactory.js";
import { FORM } from "./utils/selector.js";

new CarFactory(document.querySelector(FORM), { onCarsGenerated: console.log });
