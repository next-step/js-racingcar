import RacingStarter from "./components/RacingStarter.js";

const app = () => {
  const $app = document.querySelector("#app");
  const renderInitView = () => {
    /*html */
    $app.innerHTML = `<section class="d-flex justify-center mt-5" >
    <form id ="racing-starter-form">
    </form>
  </section>
  <section class="d-flex justify-center mt-5">
    <div class="mt-4 d-flex">
    </div>
  </section>
  <section class="d-flex justify-center mt-5">
    <div>
      <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  </section>`;
  };

  renderInitView();

  const $racingStarterContainer = document.querySelector(
    "#racing-starter-form"
  );

  new RacingStarter({ $target: $racingStarterContainer });
};

app();
