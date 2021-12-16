import Component from "../core/Component.js";
import CarNameForm from "./carNameForm.js";
import TrialCountForm from "./trialCountForm.js";

export default class InputForms extends Component {
  template() {
    return /*html*/ `
    <form id="fieldset-input">
      <fieldset id="fieldset-carName"></fieldset>
      <fieldset id="fieldset-trialCount"></fieldset>
    </form>`;
  }

  mounted() {
    const $fieldSetCarName = this.$target.querySelector("#fieldset-carName");
    const $fieldSetTrialCount = this.$target.querySelector(
      "#fieldset-trialCount"
    );

    new CarNameForm($fieldSetCarName, {
      getCarName: this.$props.getCarName,
    });

    new TrialCountForm($fieldSetTrialCount, {
      getTrialCount: this.$props.getTrialCount,
    });
  }
}
