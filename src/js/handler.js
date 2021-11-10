import { $ } from "./utils.js";
import racing from "./racing.js";

const $turnsField = $.get("#turns-field");
const $stadiumSection = $.get("#stadium-section");
const $resultSection = $.get("#result-section");

const $carsInput = $.get("#cars-input");
const $carsButton = $.get("#cars-button");

$carsButton.onclick = () => {
  if (racing.setCars($carsInput.value, $turnsField)) {
    $carsInput.disabled = true;
  }
};

const $turnsInput = $.get("#turns-input");
const $turnsButton = $.get("#turns-button");

$turnsButton.onclick = async () => {
  if (racing.setTurns($turnsInput.value)) {
    $turnsInput.disabled = true;
    await racing.play($stadiumSection);
    racing.printResult($resultSection);
  }
};

const $resetButton = $.get("#reset-button");
$resetButton.onclick = () => {
  racing.clear(
    [$carsInput, $turnsInput],
    [$turnsField, $stadiumSection, $resultSection]
  );
};
