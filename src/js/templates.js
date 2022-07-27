const carListTemplate = (name) => `
  <li class="mr-2">
    <div class="car-player">${name}</div>
    <div class="d-flex justify-center items-center mt-3">
      <div class="process-container"></div>
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </li>
  `;

const carForwardTemplate = `
  <div class="forward-icon mt-2">⬇️️</div>
  `;

export { carListTemplate, carForwardTemplate };
