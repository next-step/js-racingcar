const $carNameSubmit = document.querySelector('#car-name-submit');

$carNameSubmit.addEventListener('click', () => {
  const $carNameInput = document.querySelector('#car-name-input');
  const value = $carNameInput.value.trim();

  if (!value) {
    alert('자동차 이름을 입력해주세요.');
  }
});
