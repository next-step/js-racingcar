import Observable from "../util/observable.js";
import RacingInfoModel from "../model/racingInfoModel.js";

import { notifyTypes } from "../util/constants.js";

class RacingResultController {
  constructor() {
    this.racingInfoModel = RacingInfoModel;
  }

  handleRaceReset() {
    this.racingInfoModel.entires = [];
    this.racingInfoModel.moveCount = 0;
    this.racingInfoModel.movingDistPerCar = [];

    Observable.notify(notifyTypes.RESET_RACE);
  }
}

export default new RacingResultController();
