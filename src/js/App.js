import CarNameForm from "./components/CarNameForm.js";
import RacingPanel from "./components/RacingPanel.js";
import RacingWinner from "./components/RacingWinner.js";

export default class App {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return `
      <section id="CarNameForm" class="d-flex justify-center mt-5"></section>
      <section id="RacingPanel" class="d-flex justify-center mt-5"></section>
      <section id="RacingWinner" class="d-flex justify-center mt-5"></section>
    `;
  }

  mounted() {
    console.log("???", document.querySelector("#CarNameForm"));
    this._CarNameForm = new CarNameForm(document.querySelector("#CarNameForm"));
    this._RacingPanel = new RacingPanel(document.querySelector("#RacingPanel"));
    this._RacingWinner = new RacingWinner(document.querySelector("#RacingWinner"));
  }
}
