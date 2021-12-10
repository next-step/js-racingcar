import store from "./store/index.js";
import View from "./views/View.js";
import RaceCarInputForm from "./views/RaceCarInputForm.js";
import RaceCountInputForm from "./views/RaceCountInputForm.js";
import RaceCourseView from "./views/RaceCourseView.js";
import RaceResultView from "./views/RaceResultView.js";
import { $ } from "./utils/index.js"

class RacingGameApp extends View {
  tag = "[RacingGameApp]";

  init() {
    $("car-input-form").on("submit-car-names", this.onSubmitCars);
    $("race-count-form").on("submit-run-count", this.onSubmitCount);
    $("race-course-view").on("finish-racing", this.onFinishGame);
    $("race-result-view").on("restart", this.onRestart);

    store
      .init()
      .registerObserver($("race-course-view"));
  }

  onSubmitCars = ({detail: { cars }}) => {
    store.registerCars(cars);

    $("race-count-form").show();
  }

  onSubmitCount = ({detail: { count }}) => {
    store.count = count;
    store.notifyObserver("start-racing");
  }

  onFinishGame = ({ detail: { result } }) => {
    $("race-result-view")
      .renderResult(result)
      .show()
      .congrats();
  }

  onRestart = () => {
    this.replaceChildren();
    this.insertAdjacentHTML("beforeend", this.render());

    this.init();
  }

  render() {
    /* html */
    return `
      <section class="d-flex justify-center mt-5">
        <form id="RaceDataForm">
          <car-input-form></car-input-form>
          <race-count-form class="hide"></race-count-form>
        </form>
      </section>
      <race-course-view></race-course-view>
      <race-result-view class="hide"></race-result-view>
    `;
  }
}

customElements.define("racing-game-app", RacingGameApp);

export default RacingGameApp;
