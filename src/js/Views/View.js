import { Events, Messages } from '../constants.js';

function $(selector, base = document) {
  return base.querySelector(selector);
}

export class View {
  constructor({ model }) {
    this.model = model;

    this.setDOM();
    this.subscribeEvents();
  }

  setDOM() {
    this.$nameInput = $('.name-field input[type="text"]');
    this.$nameBtn = $('.name-field .btn');
    this.$countField = $('.count-field');
    this.$countInput = $('input[type="number"]', this.$countField);
    this.$countBtn = $('.btn', this.$countField);
    this.$processSection = $('.process-section');
    this.$resultSection = $('.result-section');
    this.$carContainer = $('.car-container');
    this.$result = $('h2', this.$resultSection);
    this.$resetBtn = $('.reset');
  }

  subscribeEvents() {
    const { nameInputModel, countInputModel, processModel, resultModel } = this.model;

    nameInputModel.subscribe(Events.NAME_INPUT_CHANGE, this.setNameInputValue.bind(this));
    nameInputModel.subscribe(Events.NAME_INPUT_DISABLED, this.setNameInputDisabled.bind(this));
    nameInputModel.subscribe(Events.NAME_BTN_DISABLED, this.setNameBtnDisabled.bind(this));
    countInputModel.subscribe(Events.COUNT_INPUT_CHANGE, this.setCountInputValue.bind(this));
    countInputModel.subscribe(Events.COUNT_FIELD_VISIBLE, this.setCountFieldVisibility.bind(this));
    countInputModel.subscribe(Events.COUNT_INPUT_DISABLED, this.setCountInputDisabled.bind(this));
    countInputModel.subscribe(Events.COUNT_BTN_DISABLED, this.setCountBtnDisabled.bind(this));
    processModel.subscribe(Events.PROCESS_SECTION_VISIBLE, this.setProcessSectionVisibility.bind(this));
    processModel.subscribe(Events.PROCESS_PRECEED, this.renderRacingProcess.bind(this));
    resultModel.subscribe(Events.RESULT_SECTION_VISIBLE, this.setResultSectionVisibility.bind(this));
    resultModel.subscribe(Events.WINNERS_CHANGE, this.renderWinners.bind(this));
  }

  setNameInputValue(value) {
    this.$nameInput.value = value;
  }

  setNameInputDisabled(disabled) {
    this.$nameInput.disabled = disabled;
  }

  setNameBtnDisabled(disabled) {
    this.$nameBtn.disabled = disabled;
  }

  setCountInputValue(value) {
    this.$countInput.value = value;
  }

  setCountInputDisabled(disabled) {
    this.$countInput.disabled = disabled;
  }

  setCountFieldVisibility(visibility) {
    this.$countField.style.visibility = visibility ? 'visible' : 'hidden';
  }

  setCountBtnDisabled(disabled) {
    this.$countBtn.disabled = disabled;
  }

  setProcessSectionVisibility(visibility) {
    this.$processSection.style.visibility = visibility ? 'visible' : 'hidden';
  }

  setResultSectionVisibility(visibility) {
    this.$resultSection.style.visibility = visibility ? 'visible' : 'hidden';
  }

  renderRacingProcess(process) {
    this.$carContainer.innerHTML = process
      .map(
        ({ name, progress, proceeding }) => `
        <div class="mr-2" data-cy="car">
          <div class="car-player" data-cy="car-player">${name}</div>
          ${Array(progress).fill(null).map(this.getForwardTemplate).join('')}
          ${proceeding ? this.getSpinnerTemplate() : ''}
        </div>
      `,
      )
      .join('');
  }

  getForwardTemplate() {
    return '<div class="forward-icon mt-2" data-cy="forward">⬇️️</div>';
  }

  getSpinnerTemplate() {
    return `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner" data-cy="spinner"></span>
      </div>
    </div>
    `;
  }

  renderWinners(winners) {
    this.$result.textContent = Messages.WINNERS(winners.join(','));
  }
}
