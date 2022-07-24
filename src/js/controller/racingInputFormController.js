import Observable from "../util/observable.js";
import RacingInfoModel from "../model/racingInfoModel.js";

import { notifyTypes, MAX_NUM_OF_ENTRIES } from "../util/constants.js";

class RacingInputFormController {
  constructor() {
    this.racingInfoModel = RacingInfoModel;
  }

  handleEntryConfirm(entires) {
    const entriesArray = entires.split(",").map((entry) => entry.trim());

    if (0 < entriesArray.length && entriesArray.length <= MAX_NUM_OF_ENTRIES) {
      this.racingInfoModel.setEntries(entriesArray);
    } else {
      throw new Error(`0 이상 ${MAX_NUM_OF_ENTRIES} 이하의 자동차만 가능합니다`);
    }

    Observable.notify(notifyTypes.ENTRY_CONFIRM);
  }
}

export default new RacingInputFormController();
