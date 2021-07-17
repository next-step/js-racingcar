export default class InputView {
	constructor(controller) {
		this.controller = controller;
		this.input = document.querySelector('input');
		this.btn = document.querySelector('.btn');
		// 컨트롤러에서 모델을 호출하던 의존성이 사라지고,
		// 콜백으로 받아오는 update 메서드에 모델이 인자로 들어온다.
		// 해당 뷰를 컨트롤러 뷰에 등록한다.
		// 이때 컨트롤러-모델은 1:1관계가 되고, model과 view는 1:n관계가 될 수 있다.
		this.controller.model.registerObserver(this);
		this.update();
		this.addEvents();
	}
	addEvents = function () {
		this.btn.addEventListener(
			'click',
			this.controller.clickHandler(this.input)
		);
		this.input.addEventListener(
			'keypress',
			this.controller.keyPressHandler(this.input)
		);
	};
	update = function (model = this.controller.model) {
		this.input.value = '';
		this.input.disabled = model.inputDisabled;
		this.btn.disabled = model.inputDisabled;
	};
}
