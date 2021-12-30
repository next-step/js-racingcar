import CarNames from "./CarNames.js";
import TryTimes from "./TryTimes.js";

export default class App {
  constructor({
    validCarNames,
    validTryTimes,
  }) {
    this.validCarNames = validCarNames;
    this.validTryTimes = validTryTimes;

    this.carNames = new CarNames({
      carNamesArray: [],
			$inputCarNames: document.querySelector(".input-car-names"),
      $inputCarNamesButton: document.querySelector(".input-car-names-confirm"),
      setCarNamesArray: (array) => {

        this.validCarNames = array;
      },

		});

    this.tryTimes = new TryTimes({
			$inputTryTimes: document.querySelector(".input-try-times"),
			$inputTryTimesButton: document.querySelector(".input-try-times-confirm"),
      setTryTimes: (number) => {
        console.log(number)
				this.validTryTimes = number;
			},
		});
  }
} 
