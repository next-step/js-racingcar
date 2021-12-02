import RacingCar from "./racingcar.js";
import * as SELECTOR from "./constants/selector.js";

const lotto = new RacingCar({
  $raceCarListInp: document.querySelector(SELECTOR.RACE_CAR_LIST_INPUT),
  $raceCarListBtn: document.querySelector(SELECTOR.RACE_CAR_LIST_BUTTON),
  $raceCntInp: document.querySelector(SELECTOR.RACE_CNT_INPUT),
  $raceCntBtn: document.querySelector(SELECTOR.RACE_CNT_BUTTON),
  $raceGround: document.querySelector(SELECTOR.RACE_GROUND),
  $raceCntContainer: document.querySelector(SELECTOR.RACE_CNT_CONTAINER),
  $resultContainer: document.querySelector(SELECTOR.RESULT_CONTINAER),
});

lotto.bindEvents();
