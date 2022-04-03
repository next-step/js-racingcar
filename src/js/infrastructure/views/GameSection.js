/* eslint-disable prettier/prettier */
const ArrowDiv = length =>
  Array.from({ length }).map(() => /*html*/ `
    <div class="forward-icon mt-2">⬇️️</div>
  `).join('');

const RacingGameProgress = cars => /*html*/ `
  <div class="mt-4 d-flex">
  ${cars.map(car => /*html*/ `
    <div class="mr-2">
      <div class="car-player">${car.getName()}</div>
      ${ArrowDiv(car.getMoveCount())}
    </div>
  `).join('')}
  </div>`;

const GameSection = ({ cars }) => {
  if (cars.length < 1) return /*html*/ `<section></section>`;
  
  return /*html*/ `
    <section class="d-flex justify-center mt-5" data-props="game-section">
      ${RacingGameProgress(cars)}
    </section>`;
};

export default GameSection;
