// 상태를 관리한다?
export default class Model {
	constructor() {
		this.heading = 'hello';
		this.input = {value: '', disabled: false, focus: true};

		this.gameBtn = {disabled: false, title: 'game-start'};
		this.result = [];
		this.observers = [];
	}
	set heading(args) {
		this._heading = args;
	}
	get heading() {
		return this._heading;
	}
	get games() {
		return this.heading.split('');
	}
	// observer는 view 객체
	registerObserver = function (observer) {
		this.observers.push(observer);
	};
	setInput = (input) => {
		this.input = {...this.input, ...input};
		this.notifyAll();
	};
	changeInput = (value) => {
		this.input = {...this.input, value};
		this.notifyAll();
	};
	notifyAll = function () {
		const observers = this.observers;
		for (const ob of observers) {
			ob.update(this);
		}
	};
	// 모델에 있어야 하는 로직인가?
	// 컨트롤러에 있어야 하는 로직인가?
	submit = () => {
		const value = this.input.value;
		if (!value) return;

		this.heading = value;
		this.input = {value: '', focus: true, disabled: true};
		this.notifyAll();
	};
	resetGame = () => {
		this.result = [];
		this.setInput({value: '', disabled: false, focus: true});
		this.setGameBtn({disabled: false, title: 'game-start'});
		this.notifyAll();
	};
	setGameBtn = (btnState) => {
		this.gameBtn = {...btnState};
		this.notifyAll();
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
