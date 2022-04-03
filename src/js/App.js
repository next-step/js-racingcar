import UserInput from "./components/UserInput.js";

function App() {
  render();
}

const render = () => {
  const target = document.querySelector("#app");
  target.innerHTML = `
 
    <section class="d-flex justify-center mt-5">
      <form id="user-input-component">
      </form>
    </section>
    <section class="d-flex justify-center mt-5">
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
    </section>
    <section class="d-flex justify-center mt-5">
      <div>
        <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    </section>

    `;
};

/** Render Components */
App();
UserInput();
