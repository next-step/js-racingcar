import { callAfterAllInit } from '../utils.js';

export default class Controller {
	constructor(model, views) {
		this.model = model;
		this.views = views;
		this.registerObserverAll();

		// 이벤트 바인딩은, controller가 다 생성된 후, view에 핸들러를 바인딩 할 수 있기 때문에
		// 컨트롤러가 다 생성된 이후에 이벤트를 바인딩 해야 한다.
		callAfterAllInit(this.addEventsAll.bind(this));
	}
	addEventsAll = () => {
		Object.values(this.views).forEach((view) => view.addEvents(this));
	};

	registerObserverAll = () => {
		Object.values(this.views).forEach(this.model.registerObserver);
	};
	get model() {
		return this._model;
	}
	set model(args) {
		this._model = args;
	}
}
