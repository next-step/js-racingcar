import { divSelector, sectionSelector, spanSelector } from '../constant/selector.js'
import {$} from '../utils.js'

export const paintCar = function (carsElement) {
  $(divSelector.CAR_PLAYERS_WRAPPER).innerHTML = carsElement
}

export const showRaceSection = function () {
  $(sectionSelector.RACE_SECTION).classList.remove('d-none')
}

export const getCarComponent = function(name) {
  const carWrapper = document.createElement('div');
  carWrapper.id = divSelector.CAR_WRAPPER.slice(1);
  carWrapper.classList.add('mr-2');
  
  const carName = document.createElement('span');
  carName.classList.add(spanSelector.CAR_NAME.slice(1));
  carName.innerText = name;
  
  carWrapper.appendChild(carName);

  return carWrapper;
}
