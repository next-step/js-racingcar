export const $racingcarSection = document.querySelector('#racingcar');

export const $racingcars = document.querySelector('.cars');
export const $carPlayer = document.querySelectorAll('.car-player');

export const $resultSection = document.querySelector('#result');

export const hideRacingcarSection = () => {
  $racingcarSection.classList.add('d-none');
}

export const showRacingcarSection = () => {
  $racingcarSection.classList.replace('d-none', 'd-flex');
}

export const hideResultSection = () => {
  $resultSection.classList.add('d-none');
}

export const renderCarName = (cars) => {
  let carTemplate = ``;
  cars.forEach((car) => {
    carTemplate += `<div class="car mr-2"><div class="car-player">${car.toUpperCase()}</div></div>`;
  })

  $racingcars.innerHTML = carTemplate;
}

export const renderRacingGame = (racingResult) => {
  document.querySelectorAll('.car-player').forEach((element, index) => {
    if (racingResult[index] !== '') {
      element.insertAdjacentHTML('afterend', `<div class="forward-icon mt-2">${racingResult[index]}</div>`)
    }
    
  })
}
