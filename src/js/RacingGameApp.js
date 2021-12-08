import store from "./store/index.js";
import RaceCarInputForm from "./views/RaceCarInputForm.js";
import RaceCountInputForm from "./views/RaceCountInputForm.js";
import RaceCourseView from "./views/RaceCourseView.js";
import RaceResultView from "./views/RaceResultView.js";
import { $ } from "./utils/index.js"

class RacingGameApp {
  tag = "[RacingGameApp]";

  constructor(selector) {
    this.$elem = $(selector);
    if (!this.$elem) throw this.$elem;

    this.init();
  }

  init() {
    this.render();

    $("car-input-form").on("submit-car-names", this.onSubmitCars);
    $("race-count-form").on("submit-run-count", this.onSubmitCount);
    $("race-course-view").on("finish-racing", this.onFinishGame);
    $("race-result-view").on("restart", this.onRestart);

    store
      .init()
      .registerObserver($("race-course-view"));
  }

  onSubmitCars = ({detail: { cars }}) => {
    // console.log(`${this.tag}: onSubmitCars ${cars}`);
    store.registerCars(cars);

    $("race-count-form").show();
  }

  onSubmitCount = ({detail: { count }}) => {
    // console.log(`${this.tag}: onSubmitCount `,count);

    store.count = count;
    store.notifyObserver("start-racing");
  }

  onFinishGame = ({ detail: { result } }) => {
    $("race-result-view")
      .renderResult(result)
      .show();
  }

  onRestart = () => {
    this.init();
  }

  render() {
    this.$elem.replaceChildren();

    /* html */
    const html = `
      <section class="d-flex justify-center mt-5">
        <form id="RaceDataForm">
          <car-input-form></car-input-form>
          <race-count-form class="hide"></race-count-form>
        </form>
      </section>
      <race-course-view></race-course-view>
      <race-result-view class="hide"></race-result-view>
    `;

    this.$elem.insertAdjacentHTML("beforeend", html);
  }
}

export default RacingGameApp;