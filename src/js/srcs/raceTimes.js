import { $, handledisabled } from "../utils/DOM.js";
import { MIN_RACE_TIMES, MSG } from "../utils/constants.js";
import { racing } from "./racing.js";
import { state } from "./../utils/state.js";

const submitRaceTimes = ({ target }) => {
  if ($("#inputRaceTimes").value < MIN_RACE_TIMES)
    return alert(MSG.INVALID_RACING_TIMES);

  state.racingTimes = $("#inputRaceTimes").value;
  handledisabled($("#inputRaceTimes"), target);
  racing();
};

export const raceTimes = () => {
  $("#raceTimesWrap").innerHTML = `
  <p>시도할 횟수를 입력해주세요.</p>
  <div class="d-flex">
    <input
      type="number"
      id="inputRaceTimes"
      class="w-100 mr-2"
      placeholder="시도 횟수"
    />
    <button type="button" id="submitRaceTimes" class="btn btn-cyan">
      확인
    </button>
  </div>
`;

  $("#submitRaceTimes").addEventListener("click", submitRaceTimes);
};
