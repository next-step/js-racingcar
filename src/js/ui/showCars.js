export default function showCars(cars) {
  const racingWrapper = document.getElementById('racing-wrapper');
  const racingInnerWrapper = document.querySelector('.racing-inner-wrapper');

  let temp = ``;

  cars.forEach(it => {
    temp += `<div class="mr-2 car-player-wrap">
              <div class="car-player" data-forward-count='0'>${it}</div>
            </div>`;
  });

  racingInnerWrapper.innerHTML = temp;
  racingWrapper.style.display = 'block';
}