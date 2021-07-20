import Component from '../../core/Component/Component.js';

class CarPlayer extends Component {
  constructor($target, $props, store) {
    super($target, $props, store);
  }

  template() {
    const { cars } = this.$store.getState();

    return cars
      .map(
        ({ carName, carStates }) => `
      <div class="mr-2" id="racing-track">
        <div class="car-player">${carName}</div>
        ${carStates.map((state) => stateTemplate(state)).join('')}
      </div>
    `
      )
      .join('');
  }
}

const stateTemplate = (carState) => {
  const loading = `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
    `;
  const forward = `<div class="forward-icon mt-2">⬇️️</div>`;

  const template = { loading, forward }[carState];

  if (!template) return '';
  return template;
};

export default CarPlayer;
