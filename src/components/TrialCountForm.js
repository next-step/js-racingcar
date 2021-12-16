import Component from "../core/Component.js";
import { eventType, errorMsgs } from "../constants.js";

export default class TrialCountForm extends Component {
  template() {
    return /*html*/ `
    <p>시도할 횟수를 입력해주세요.</p>
    <div class="d-flex trialCount-container">
      <input type="number" class="w-100 mr-2 trialCount-input" placeholder="시도 횟수" />
      <button type="button" class="btn btn-cyan trialCount-submitBtn">확인</button>
    </div>`;
  }

  setEvent() {
    this.addEvent("click", ".trialCount-submitBtn", (e) => {
      e.preventDefault();
      this.submitTrialCount();
    });

    this.addEvent("keyup", ".trialCount-container", (e) => {
      if (e.key != eventType.ENTER) return;
      e.preventDefault();
      this.submitTrialCount();
    });
  }

  submitTrialCount() {
    if (!this.checkCarName()) {
      alert(errorMsgs.EMPTY_NAME);
      return;
    }

    const { getTrialCount } = this.$props;
    const inputTrialCount =
      document.querySelector(".trialCount-input").valueAsNumber;

    if (isNaN(inputTrialCount)) {
      alert(errorMsgs.EMPTY_TRIAL_COUNT);
      return;
    }

    getTrialCount(inputTrialCount);
    document.getElementById("fieldset-carName").disabled = true;
    document.getElementById("fieldset-trialCount").disabled = true;
  }

  checkCarName() {
    const $fieldSetCarName = document.querySelector("#fieldset-carName");

    if (!$fieldSetCarName.hasAttribute("disabled")) return false;

    return true;
  }
}
