// 상태를 관리한다?
export default class Model {
	constructor() {
		this.heading = 'hello';
		this.inputDisabled = false;
		this.games = [1, 2, 3, 4];
		this.result = [];
		this.observers = [];
	}
	// observer는 view 객체
	registerObserver = function (observer) {
		this.observers.push(observer);
	};
	notifyAll = function () {
		const observers = this.observers;
		for (const ob of observers) {
			ob.update(this);
		}
	};
	// 모델에 있어야 하는 로직인가?
	// 컨트롤러에 있어야 하는 로직인가?
	submit = (input) => {
		this.heading = input.value;
		this.inputDisabled = true;
		input.focus();
		this.notifyAll();
	};
	resetGame = () => {
		this.result = [];
	};

	showResult = (calback, n) => {
		this.result.pop();
		this.notifyAll();
		this.result.push(this.games[n]);
		this.notifyAll();
		this.game(n + 1, calback);
	};
	game = (n, calback) => {
		if (n === this.games.length) {
			calback();
			return;
		}
		this.result.push('loading...');
		this.notifyAll();
		setTimeout(this.showResult.bind(this, calback, n), 1000);
	};
}
