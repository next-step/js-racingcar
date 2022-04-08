import carsStore from '../store/cars';

const Cars = (cars) => {
  const template = document.createElement('template');

  template.innerHTML = cars
    .reduce((acc, car) => {
      const player = `
                    <div class="mr-2">
                        <div
                            class="racingcar-car-player"
                            data-target="racingcar-car-player"
                        >${car.name}</div>
                        ${forward.repeat(car.moved)}
                        ${!carsStore.GET_WINNERS().length ? spinner : ''}
                    </div>
                `;

      acc.push(player.replace(/ +/g, ' '));
      console.log(acc);
      return acc;
    }, [])
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

export default Cars;
