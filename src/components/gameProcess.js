import { $ } from '../utils/dom.js';

export default function GameProcess() {
  this.$gameProcess = $('.game-process-container');

  this.render = () => {
    this.$gameProcess.innerHTML = String.raw`
        <div class="mt-4 d-flex" style="display: none;">
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
    `;
  };

  this.render();
}
