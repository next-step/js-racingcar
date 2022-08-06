import Observable from "../util/observable.js";
import RacingInputFormController from "../controller/racingInputFormController.js";

import { notifyTypes } from "../util/constants.js";
import { $ } from "../util/dom.js";

const countInputTemplate = /* html */ `
    <fieldset id="move-count-fieldset">
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
            <input id="move-count-input" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
            <button id="count-confirm-btn" type="button" class="btn btn-cyan">확인</button>
        </div>
    </fieldset>
`;

class RacingInputFormView {
  $racingInputForm;
  $entryInput;
  $moveCountFieldSet;
  $moveCountInput;
  $entryConfirmBtn;
  $countConfirmBtn;

  constructor() {
    this.racingInputFormController = RacingInputFormController;

    this.$racingInputForm = $("#racing-input-form");
    this.$entryInput = $("#entry-input");
    this.$entryConfirmBtn = $("#entry-confirm-btn");

    this.bindInitialObserver();
    this.bindInitialEvent();
  }

  bindInitialObserver() {
    Observable.subscribe(
      notifyTypes.ENTRY_CONFIRM,
      () => {
        this.activateEntryFieldset(false);
        this.attachCountInput();
      },
      this
    );

    Observable.subscribe(
      notifyTypes.COUNT_CONFIRM,
      () => {
        this.activateMoveCountFieldset(false);
      },
      this
    );

    Observable.subscribe(notifyTypes.RESET_RACE, () => {
      this.dettachCountInput();
      this.activateEntryFieldset(true);
    });
  }

  bindInitialEvent() {
    this.$entryConfirmBtn.addEventListener("click", this.onEntryConfirmBtnClick);
  }

  activateEntryFieldset = (active) => {
    this.$entryInput.disabled = !active;
    this.$entryConfirmBtn.disabled = !active;
  };

  activateMoveCountFieldset = (active) => {
    this.$moveCountInput.disabled = !active;
    this.$countConfirmBtn.disabled = !active;
  };

  onEntryConfirmBtnClick = (event) => {
    event.preventDefault();
    try {
      const { value } = this.$entryInput;
      this.racingInputFormController.handleEntryConfirm(value);
    } catch (error) {
      alert(error);
    }
  };

  onCountConfirmBtnClick = async () => {
    try {
      const { valueAsNumber } = this.$moveCountInput;
      await this.racingInputFormController.handleCountConfirm(valueAsNumber);
    } catch (error) {
      alert(error);
    }
  };

  attachCountInput = () => {
    this.$racingInputForm.insertAdjacentHTML("beforeEnd", countInputTemplate);

    this.$moveCountFieldSet = $("#move-count-fieldset");
    this.$moveCountInput = $("#move-count-input");
    this.$countConfirmBtn = $("#count-confirm-btn");

    this.$countConfirmBtn.addEventListener("click", async () => {
      await this.onCountConfirmBtnClick();
    });
  };

  dettachCountInput = () => {
    this.$racingInputForm.removeChild(this.$moveCountFieldSet);
  };
}

export default RacingInputFormView;
