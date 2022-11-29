export default function showCars() {
  const carNameInput = document.querySelector('.car-name');
  const carNames = carNameInput.value.split(',');
  const racingWrapper = document.getElementById('racing-wrapper');
  const racingInnerWrapper = document.querySelector('.racing-inner-wrapper');

  racingInnerWrapper.innerHTML = carNames.map(it => `
    <div class="mr-2 car-player-wrap">
      <div class="car-player" data-forward-count='0'>${it}</div>
    </div>
  `).join('');
  racingWrapper.style.display = 'block';
}