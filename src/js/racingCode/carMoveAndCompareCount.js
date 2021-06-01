import {
  $,
  $All,
  moving,
  progressTitle,
  result,
  resultDom,
  carButtonDom,
  tryButtonDom,
  sectionRaceTimes,
  Message,
} from "../utils/constant.js";

let maxCarName = [];
let countArray = {};
let max = -Infinity;

const compareCountAndTryNumber = (tryObject) => {
  if (tryObject.count === Number(tryObject.tryNumber)) {
    clearInterval(tryObject.timer);
    $All(".relative").forEach((x) => x.remove());
    checkWinner();
    resultDom.innerHTML = result(maxCarName);
    $All(".btn-cyan")[2].addEventListener("click", returnToOriginalHandler);
    setTimeout(() => {
      alert(Message.success);
    }, 2000);
  }
};

const returnToOriginalHandler = () => {
  initializeDom();
  initializeValue();
  initializeAttr();
};

const initializeDom = () => {
  while (progressTitle.hasChildNodes()) progressTitle.firstChild.remove();
  while (resultDom.hasChildNodes()) resultDom.firstChild.remove();
};

const initializeValue = () => {
  countArray = {};
  max = -Infinity;
  maxCarName = [];
  $("#inputCarName").value = "";
  $("#inputTryNumber").value = "";
};

const initializeAttr = () => {
  sectionRaceTimes.hidden = true;
  carButtonDom.disabled = false;
  tryButtonDom.disabled = false;
};

const goCarMove = (carNameArray, isGo, carMovingDom) => {
  carNameArray.map((val, idx) => {
    if (countArray[val] !== undefined)
      countArray[val] = isGo[idx] ? ++countArray[val] : countArray[val];
    else countArray[val] = isGo[idx] ? 1 : 0;
    addMovingDom(isGo, idx, carMovingDom);
  });
};

const addMovingDom = (isGo, idx, carMovingDom) => {
  if (isGo[idx]) carMovingDom[idx].insertAdjacentHTML("afterend", moving);
};

const checkWinner = () => {
  for (const idx in countArray) {
    if (max < countArray[idx]) {
      maxCarName = [];
      maxCarName.push(idx);
      max = countArray[idx];
    } else if (max === countArray[idx]) {
      maxCarName.push(idx);
      max = countArray[idx];
    }
  }
};

export { addMovingDom, compareCountAndTryNumber, goCarMove, maxCarName };
