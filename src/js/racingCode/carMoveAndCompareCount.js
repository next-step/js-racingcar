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
  successMessage,
} from "../source/source.js";

let maxCarName = [];
let countArray = {};
let max = -Infinity;

const compareCountAndTryNumber = (timer, count, tryNumber) => {
  if (count === Number(tryNumber)) {
    clearInterval(timer);
    $All(".relative").forEach((x) => x.remove());
    checkWinner();
    resultDom.innerHTML = result(maxCarName);
    $All(".btn-cyan")[2].addEventListener("click", returnToOriginalHandler);
    setTimeout(() => {
      alert(successMessage);
    }, 2000);
  }
};

const returnToOriginalHandler = () => {
  while (progressTitle.hasChildNodes()) {
    progressTitle.firstChild.remove();
  }

  while (resultDom.hasChildNodes()) {
    resultDom.firstChild.remove();
  }
  countArray = {};
  max = -Infinity;
  maxCarName = [];

  sectionRaceTimes.hidden = true;
  carButtonDom.disabled = false;
  tryButtonDom.disabled = false;

  $("#inputCarName").value = "";
  $("#inputTryNumber").value = "";
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
  if (isGo[idx]) carMovingDom[idx].insertAdjacentHTML("afterend", moving());
};

const checkWinner = () => {
  for (let idx in countArray) {
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
