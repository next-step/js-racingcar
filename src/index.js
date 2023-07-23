function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function isInvalidCarNames(carNames) {
  const names = carNames.split(',').map(name => name.trim());
  return names.some(name => name === '' || name.length > 5);
}

function startRace() {
  const carNames = document.getElementById('carNames').value;
  if (isInvalidCarNames(carNames)) {
    alert('자동차 이름은 쉼표(,)로 구분하며, 5자 이하만 가능합니다.');
    return;
  }
}