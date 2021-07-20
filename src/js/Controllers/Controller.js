export class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.addEventListeners();
  }

  addEventListeners() {
    const { nameInputModel, countInputModel, processModel, resultModel } = this.model;

    this.view.$nameInput.addEventListener('input', nameInputModel.onChangeName.bind(nameInputModel));
    this.view.$nameBtn.addEventListener('click', nameInputModel.onClickNameBtn.bind(nameInputModel));
    this.view.$countInput.addEventListener('change', countInputModel.onChangeCount.bind(countInputModel));
    this.view.$countBtn.addEventListener('click', countInputModel.onClickCountBtn.bind(countInputModel));
    this.view.$resetBtn.addEventListener('click', () => {
      nameInputModel.onClickResetBtn();
      countInputModel.onClickResetBtn();
      processModel.onClickResetBtn();
      resultModel.onClickResetBtn();
    });
  }
}
