import CarNames from "./CarNames.js";
import TryTimes from "./TryTimes.js";
import ShowProcess from "./ShowProcess.js";
import ShowResult from "./ShowResult.js";

export default class App {
	constructor({ validCarNames, validTryTimes, winners }) {
		this.validCarNames = validCarNames;
    this.validTryTimes = validTryTimes;
    this.winners = winners;

		this.carNames = new CarNames({
			$inputCarNames: document.querySelector(".input-car-names"),
			$inputCarNamesButton: document.querySelector(".input-car-names-confirm"),
			setCarNamesArray: (array) => {
				this.validCarNames = array;
			},
		});

		this.tryTimes = new TryTimes({
			$inputTryTimes: document.querySelector(".input-try-times"),
			$inputTryTimesButton: document.querySelector(".input-try-times-confirm"),
			setTryTimes: async (number) => {
        this.validTryTimes = number;
        await this.showProcess.setState(this.validCarNames, this.validTryTimes);
        const countMoveArray = [...document.querySelectorAll(".car-player-container")].map((element) => element.childElementCount - 2);
        countMoveArray.forEach((count, idx) => {
          if (count === Math.max(...countMoveArray)) {
            this.winners.push(this.validCarNames[idx])
          }
        })
        this.showResult.setState(this.winners);
			},
		});

    this.showProcess = new ShowProcess({
			initialCarNames: [],
			initialTryTimes: "",
      $showProcess: document.querySelector(".show-process"),
		});

    this.showResult = new ShowResult({
      initialWinners: [],
      $winners: document.querySelector('.winners'),
      $showResult: document.querySelector(".show-result"),
      $resultReset: document.querySelector(".result-reset"),
		});
	}
}
