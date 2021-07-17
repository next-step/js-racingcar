export default class ListView {
	constructor(controller) {
		this.controller = controller;
		this.ul = document.querySelector('.list');
		this.gameBtn = document.querySelector('.game-start');
		this.addEvents();
		this.controller.model.registerObserver(this);
	}
	addEvents = () => {
		this.gameBtn.addEventListener(
			'click',
			this.controller.gameClickHandler(this.gameBtn)
		);
	};

	update = (model) => {
		this.ul.innerHTML = `
      ${model.result.map((item) => `<li>${item}</li>`).join('')}
    `;
	};
}
