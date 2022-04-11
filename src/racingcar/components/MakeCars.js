import carsStore from '../store/carsStore';

const MakeCars = (cars) => {
  const template = document.createElement('template');

  template.innerHTML = cars
    .map(
      (car) => `
        <div class="mr-2">
          <div class="racingcar-car-player" data-target="racingcar-car-player">
            ${car.name}
          </div>
          ${forward.repeat(car.moved)}
          ${!carsStore.GET_WINNERS().length ? spinner : ''}
        </div>
    `,
    )
    .join('');

  return template.content;
};

const forward = `<div class="forward-icon mt-2">⬇️️</div>`;

const spinner = `
                <div class="d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                        <span class="material spinner"></span>
                    </div>
                </div>
            `;

export default MakeCars;
