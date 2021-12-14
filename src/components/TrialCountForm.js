import Component from "../core/Component.js";

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
      if (e.key != "Enter") return;
      e.preventDefault();
      this.submitTrialCount();
    });
  }

  submitTrialCount() {
    if (!this.checkCarName()) {
      alert("자동차 이름을 입력하고 시도횟수를 입력해주세요.");
      return;
    }
    const { getTrialCount } = this.$props;
    getTrialCount(document.querySelector(".trialCount-input").value);
    document.getElementById("fieldset-carName").disabled = true;
    document.getElementById("fieldset-trialCount").disabled = true;
  }

  checkCarName() {
    const $fieldSetCarName = document.querySelector("#fieldset-carName");

    if (!$fieldSetCarName.hasAttribute("disabled")) return false;

    return true;
  }
}
