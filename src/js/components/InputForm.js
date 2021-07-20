import { $, $$$, setSelectorHidden } from "../utils/util.js";
import { carList, Car } from "../Car.js";
import { renderGame, setGameCnt, startGame } from "./CarGame.js";

const $form = $("form");
const $carName = $("#carName");
const $gaemCnt = $("#gameCnt");

const ERRORCARNAME =
  "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.";

const formKeyUp = ({ target, key }) => {
  if (key != "Enter") {
    return;
  }
  console.log(target);
  const inputText = target.value;
  if (target.placeholder === "자동차 이름") {
    setCarNameList(inputText);
    return;
  }
  if (target.placeholder === "시도 횟수") {
    changeGameCount(inputText);
    return;
  }
};
const formClick = ({ target }) => {
  const closestId = target.closest("div").id;
  const inputText = $$$($carName, "input").value;
  if (target.innerText != "확인") {
    return;
  }
  if (closestId === "carName") {
    setCarNameList(inputText);
    return;
  }
  if (closestId === "gameCnt") {
    changeGameCount(inputText);
  }
};

const setCarNameList = (inputText) => {
  if (inputText === "") {
    return alert(ERRORCARNAME);
  }
  Car();
  const splitStr = inputText.split(",");
  console.log(splitStr);
  for (let str of splitStr) {
    str = str.trim();

    if (str.length < 1 || 5 < str.length) {
      return alert(ERRORCARNAME);
    }
    carList.push({ name: str, distance: 0 });
  }
  setDisable($carName);
  setSelectorHidden($gaemCnt, false);
  renderGame();
  return;
};

const changeGameCount = (inputText) => {
  if (inputText === "") {
    return;
  }
  setGameCnt(inputText);
  setDisable($gaemCnt);
  startGame();
  return;
};

const setDisable = (selector) => {
  $$$(selector, "input").disabled = true;
  $$$(selector, "button").disabled = true;
  console.log($$$(selector, "input"), $$$(selector, "button"));
};
export const InputForm = () => {
  setSelectorHidden($gaemCnt, true);
  $form.addEventListener("keyup", formKeyUp);
  $form.addEventListener("click", formClick);
};
