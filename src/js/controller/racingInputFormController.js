import Observable from "../util/observable.js";
import RacingInfoModel from "../model/racingInfoModel.js";

import { notifyTypes } from "../util/constants.js";

class RacingInputFormController {
  constructor() {
    this.racingInfoModel = RacingInfoModel;
  }

  handleEntryConfirm(entires) {
    const entriesArray = entires.split(",").map((entry) => entry.trim());

    if (0 < entriesArray.length) {
      this.racingInfoModel.setEntries(entriesArray);
    }

    Observable.notify(notifyTypes.ENTRY_CONFIRM);
  }

  handleCountConfirm(count) {
    const countAsNum = Number(count);

    if (countAsNum <= 0) {
      throw new Error("0 이상의 숫자만 입력해 주세요");
    } else {
      this.racingInfoModel.moveCount = countAsNum;
    }
    Observable.notify(notifyTypes.COUNT_CONFIRM);

    this.racingInfoModel.moveCars();
    Observable.notify(notifyTypes.PROCESS_RACE, this.racingInfoModel.entires, this.racingInfoModel.movingDistPerCar);

    this.racingInfoModel.getRacingResult();
    Observable.notify(notifyTypes.GET_RACE_RESULT, this.racingInfoModel.racingWinner);
  }
}

export default new RacingInputFormController();
