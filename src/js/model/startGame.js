import { printCarRacingResult } from '../ui/printCarRacingResult.js';
import showCars from '../ui/showCars.js';
import carRacing from './carRacing.js';
import getResult from './getResult.js';

export default function startGame(counts) {
  const carNameInput = document.querySelector('.car-name');
  const carNames = carNameInput.value.split(',');
  showCars(carNames);
  
  const cars = document.querySelectorAll('.car-player');
  for (let i = 0; i < counts; i++) {
    carRacing(cars);
  }

  const result = getResult(cars);
  printCarRacingResult(result);
}