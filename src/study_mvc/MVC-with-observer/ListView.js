export default class ListView {
	constructor(controller) {
		this.controller = controller;
		this.ul = document.querySelector('.list');
		this.gameBtn = document.querySelector('.game-start');
		// 이하 공통적인 로직
		this.controller.model.registerObserver(this);
		this.update(this.controller.model);
		this.addEvents();
	}
	addEvents = () => {
		this.gameBtn.addEventListener('click', this.controller.gameClickHandler);
	};

	update = (model) => {
		this.gameBtn.disabled = model.gameBtn.disabled;
		this.gameBtn.innerHTML = model.gameBtn.title;
		this.ul.innerHTML = `
      ${model.result.map((item) => `<li>${item}</li>`).join('')}
    `;
	};
}
