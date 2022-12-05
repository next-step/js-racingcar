const $countInputSet = document.getElementById('count-input-set');
const $carNameInputSet = document.getElementById('car-name-input-set');

const $carNameInput = $carNameInputSet.getElementsByTagName('input')[0];
const $carNameInputButton = $carNameInputSet.getElementsByTagName('button')[0];

$carNameInputButton.addEventListener('click', () => {
  const inputVals = $carNameInput?.value?.split(',');
  const isInputValLengthCorrect = inputVals.some((inputVal) => !!inputVal && inputVal.length <= 5);

  if (!isInputValLengthCorrect) {
    alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
    return;
  }

  $carNameInputSet.setAttribute('disabled', true);
  $countInputSet.classList.remove('hide');
});
