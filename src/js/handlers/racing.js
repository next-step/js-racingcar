import { $racingcarNameInput } from "../views/form.js";
import { renderRacingGame } from "../views/racing.js";


const getRacingResult = (cars) => {
  return cars.map(() => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber > 3 ? '️️⬇️️' : '' 
  })
};

export const createRacingGame = (attemptNumber) => {
  const cars = $racingcarNameInput.value.split(',');
  
  Array.from({ length: attemptNumber }, () => {
    const racingResult = getRacingResult(cars);
    renderRacingGame(racingResult);
  })
}