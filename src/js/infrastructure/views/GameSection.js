const GameSection = ({ cars }) => {
  const displayNone = cars.length > 0 ? '' : 'd-none';
  return /*html*/ `
<section class="d-flex justify-center mt-5 ${displayNone}" data-props="game-section">
  <div class="mt-4 d-flex">
    ${cars
      .map(
        car => /*html*/ `
    <div class="mr-2">
      <div class="car-player">${car.getName()}</div>
      ${Array.from({ length: car.getMoveCount() })
        .map(() => /*html*/ `<div class="forward-icon mt-2">⬇️️</div>`)
        .join('')}
    </div>
    `,
      )
      .join('')}
  </div>
</section>`;
};

export default GameSection;

{
  /* <div class="mr-2">
<div class="car-player">WEST</div>
<div class="forward-icon mt-2">⬇️️</div>
</div>
<div class="mr-2">
<div class="car-player">SOUTH</div>
<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>
</div>
<div class="mr-2">
<div class="car-player">NORTH</div>
<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>
</div> */
}
