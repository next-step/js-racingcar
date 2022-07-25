import { freezeCarTryView } from "../view/car-try-input.js"
import { racingGameStore } from "../model/index.js"
export const handleCarTryInput = function (carTryInput) {
  freezeCarTryView()
  racingGameStore.setCarTry(carTryInput);
}
