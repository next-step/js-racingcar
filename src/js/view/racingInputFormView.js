import Observable from "../util/observable.js";
import BaseView from "./baseView.js";
import RacingInputFormController from "../controller/racingInputFormController.js";

import { notifyTypes } from "../util/constants.js";
import { $ } from "../util/dom.js";

const countInputTemplate = /* html */ `
    <fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
            <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
            <button id="count-confirm-btn" type="button" class="btn btn-cyan">확인</button>
        </div>
    </fieldset>
`;

class RacingInputFormView extends BaseView {
  constructor() {
    super();
    this.racingInputFormController = RacingInputFormController;

    this.$racingInputForm = $("#racing-input-form");
    this.$entryInput = $("#entry-input");
    this.$entryConfirmBtn = $("#entry-confirm-btn");

    this.bindObserver();
    this.bindInitialEvent();
  }

  bindObserver() {
    Observable.subscribe(
      notifyTypes.ENTRY_CONFIRM,
      () => {
        this.$entryInput.disabled = "disabled";
        this.$entryConfirmBtn.disabled = "disabled";
        this.attachCountInput();
      },
      this
    );
  }

  bindInitialEvent() {
    this.$entryConfirmBtn.addEventListener("click", this.onEntryConfirmBtnClick);
  }

  onEntryConfirmBtnClick = () => {
    try {
      const { value } = this.$entryInput;
      this.racingInputFormController.handleEntryConfirm(value);
    } catch (error) {
      alert(error);
    }
  };

  onCountConfirmBtnClick = () => {};

  attachCountInput = () => {
    this.$racingInputForm.insertAdjacentHTML("beforeEnd", countInputTemplate);

    const $countInputBtn = $("#count-confirm-btn");
    $countInputBtn.addEventListener("click", this.onCountConfirmBtnClick);
  };
}

export default RacingInputFormView;
