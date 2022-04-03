const $carNameSubmit = document.querySelector('#car-name-submit');

$carNameSubmit.addEventListener('click', () => {
  const $carNameInput = document.querySelector('#car-name-input');
  const value = $carNameInput.value.trim();
  const regexp = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣,]+$/g; // TODO: 변수 이름 변경

  if (!value) {
    alert('자동차 이름을 입력해주세요.');
    return;
  }

  if (!regexp.test(value)) {
    alert('자동차 이름은 영문, 한글, 쉼표만 입력할 수 있습니다');
  }
});
