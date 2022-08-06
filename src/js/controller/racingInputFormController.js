import Observable from "../util/observable.js";
import RacingInfoModel from "../model/racingInfoModel.js";

import { notifyTypes, MIN_RACING_ENTRIES } from "../util/constants.js";

class RacingInputFormController {
  constructor() {
    this.racingInfoModel = RacingInfoModel;
  }

  handleEntryConfirm(entires) {
    const entriesArray = entires.split(",").map((entry) => entry.trim());

    if (MIN_RACING_ENTRIES < entriesArray.length) {
      this.racingInfoModel.setEntries(entriesArray);
    }

    Observable.notify(notifyTypes.ENTRY_CONFIRM);
  }

  #handleMoveCars() {
    return new Promise((resolve) => {
      Array.from({ length: this.racingInfoModel.moveCount }, (_, i) => {
        setTimeout(() => {
          const isFinished = i === this.racingInfoModel.moveCount - 1;
          if (isFinished) {
            resolve();
          }
          this.racingInfoModel.moveCarsOneTime();
          Observable.notify(
            notifyTypes.PROCESS_RACE,
            this.racingInfoModel.entires,
            this.racingInfoModel.movingDistPerCar,
            isFinished
          );
        }, 1000 * i);
      });
    });
  }

  async handleCountConfirm(count) {
    if (count <= 0) {
      throw new Error("0 이상의 숫자만 입력해 주세요");
    } else {
      this.racingInfoModel.moveCount = count;
    }
    Observable.notify(notifyTypes.COUNT_CONFIRM);

    await this.#handleMoveCars();

    this.racingInfoModel.getRacingResult();
    Observable.notify(notifyTypes.GET_RACE_RESULT, this.racingInfoModel.racingWinner);
  }
}

export default new RacingInputFormController();
