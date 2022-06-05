import {
  $confirmTryButton,
  $confirmCarNameButton,
  $racingCarSection,
  $tryContainer,
  $inputCarName,
  $tryInputNumber,
} from "../constant/constant.js";
import { confirmCarName } from "./function/confirmCarName.js";
import { confirmTryNumber } from "./function/confirmTryNumber.js";
import { enterInputCarName } from "./function/enterInputCarName.js";
import { enterInputTryNumber } from "./function/enterInputTryNumber.js";

$confirmCarNameButton.addEventListener("click", confirmCarName);
$confirmTryButton.addEventListener("click", confirmTryNumber);

$inputCarName.addEventListener("keypress", enterInputCarName);
$tryInputNumber.addEventListener("keypress", enterInputTryNumber);

$racingCarSection.style.display = "none";
$tryContainer.style.display = "none";
