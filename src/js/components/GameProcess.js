export default class GameProcess {
  constructor(target) {
    this.#render(target);
  }

  #render = (target) => {
    target.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
            <div class="mr-2">
            <div class="car-player">EAST</div>
            <div class="forward-icon mt-2">⬇️️</div>
            <div class="forward-icon mt-2">⬇️️</div>
            </div>
            <div class="mr-2">
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
            </div>
        </div>
      </div>
          `;
  };
}
