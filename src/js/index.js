console.log(ERROR_MSG);
const $wrapCarsName = document.getElementById('wrap-cars-name');
const $inputCarsName = $wrapCarsName.querySelector('input');
const $buttonCarsName = $wrapCarsName.querySelector('button');

const $wrapTryTimes = document.getElementById('wrap-try-times');
const $inputTryTimes = $wrapTryTimes.querySelector('input');
const $buttonTryTimes = $wrapTryTimes.querySelector('button');

const $racingBoard = document.getElementById('racing-board');
const $racingResult = document.getElementById('racing-result');

const $winners = document.getElementById('winners');

let cars = [];

$buttonCarsName.addEventListener('click', (e) => {
  const carsName = $inputCarsName.value;
  isValid = checkNames(carsName);
  if (!isValid) {
    return errorAlert('INVALID_NAME');
  }

  const carObjects = carsName.split(',').map((name) => {
    name = name.trim();
    const wrapCarPlayer = document.createElement('div');
    wrapCarPlayer.className = 'mr-2';
    const html = `
        <div class="car-player">${name}</div>
        <div class="d-flex justify-center mt-3 loading">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
      `;
    wrapCarPlayer.innerHTML = html;
    $racingBoard.appendChild(wrapCarPlayer);
    return new Car(name, wrapCarPlayer);
  });

  cars = cars.concat(carObjects);

  $wrapTryTimes.classList.remove('d-none');
});

$buttonTryTimes.addEventListener('click', (e) => {
  const tryTimes = parseInt($inputTryTimes.value, 10);
  isValid = checkTimes(tryTimes);
  if (!isValid) {
    return errorAlert('INVALID_TIMES');
  }

  promiseCars = cars.map((car) => car.run(tryTimes));

  $racingBoard.classList.remove('d-none');

  Promise.all([...promiseCars]).then((results) => {
    const winner = [];
    const topScore = Math.max.apply(
      Math,
      results.map((result) => result[1]),
    );

    results.forEach((result) => {
      if (topScore == result[1]) {
        winner.push(result[0]);
      }
    });

    $racingResult.classList.remove('d-none');
    $winners.innerText = winner.join(', ');
  });
});
