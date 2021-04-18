import { $, handledisabled } from "../utils/DOM.js";
import { CARNAME, MSG } from "../utils/constants.js";
import { raceTimes } from "./raceTimes.js";
import { state } from "./../utils/state.js";

const submitCarName = ({ target }) => {
  const carNameArr = $("#inputCarName")
    .value.split(",")
    .map((v) => v.trim());
  const isValidCarName = carNameArr.every(
    (e) =>
      e.length > CARNAME.MIN_LENGTH - 1 && e.length < CARNAME.MAX_LENGTH + 1
  );
  const isDuplicateCarName =
    carNameArr.length === new Set(carNameArr).size ? false : true;

  if (!isValidCarName) return alert(MSG.INVALID_CAR_NAME);
  if (isDuplicateCarName) return alert(MSG.DUPLICATE_CAR_NAME);

  state.cars = carNameArr.map((name) => {
    return { name: name, position: 0 };
  });
  handledisabled($("#inputCarName"), target);
  raceTimes();
};

export const carName = () => {
  $("#carNameWrap").innerHTML = `
  <input
    type="text"
    id="inputCarName"
    class="w-100 mr-2"
    placeholder="자동차 이름"
  />
  <button type="button" id="submitCarName" class="btn btn-cyan">
    확인
  </button>
`;

  $("#submitCarName").addEventListener("click", submitCarName);
};
