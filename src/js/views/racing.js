import { createGoElement, createSpinnerElement } from "./elements.js";

export const $racingcarSection = document.querySelector('#racingcar');

export const $racingcars = document.querySelector('.cars');
export const $carPlayer = document.querySelectorAll('.car-player');

export const $resultSection = document.querySelector('#result');
export const $result = document.querySelector('.winners');

export const hideRacingcarSection = () => {
  $racingcarSection.classList.add('d-none');
}

export const showRacingcarSection = () => {
  $racingcarSection.classList.remove('d-none');
}

export const hideResultSection = () => {
  $resultSection.classList.add('d-none');
}

export const showResultSection = () => {
  $resultSection.classList.remove('d-none');
}

export const renderCarName = (cars) => {
  $racingcars.innerHTML = cars.map((car) => `<div class="${car} mr-2"><div class="car-player">${car}</div></div>`).join('');
}


export const renderRacingGame = (racingResult) => {
  racingResult.forEach((result) => {
    document.querySelectorAll('.car-player').forEach((element, index) => {
      element.insertAdjacentElement('afterend', createSpinnerElement());
      
      const resultEl = result[index] ? createGoElement() : '';
      
      document.querySelector('.spinner').replaceWith(resultEl)
    })
  })
}

export const renderWinners = (winners) => {
  $result.innerText = `🏆 최종 우승자: ${winners} 🏆`
};
