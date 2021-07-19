// 상태를 관리한다?
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default class Model {
	constructor() {
		this.observers = [];
		this.heading = 'hello';
		this.input = {value: '', disabled: false, focus: true};

		this.gameBtn = {disabled: false, title: 'game-start'};
		this.result = [];
	}

	get heading() {
		return this._heading;
	}
	set heading(args) {
		this._heading = args;
		this.notifyAll();
	}
	get games() {
		return this.heading.split('');
	}
	set input(args) {
		this._input = args;
		this.notifyAll();
	}
	get input() {
		return this._input;
	}
	set gameBtn(args) {
		this._gameBtn = args;
		this.notifyAll();
	}
	get gameBtn() {
		return this._gameBtn;
	}
	set result(args) {
		this._result = args;
		this.notifyAll();
	}
	get result() {
		return this._result;
	}

	// observer는 view 객체
	registerObserver = function (observer) {
		this.observers.push(observer);
	};
	setInput = (input) => {
		this.input = {...this.input, ...input};
	};
	changeInput = (value) => {
		this.input = {...this.input, value};
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
	};
	resetGame = () => {
		this.result = [];
		this.setInput({value: '', disabled: false, focus: true});
		this.setGameBtn({disabled: false, title: 'game-start'});
	};
	setGameBtn = (btnState) => {
		this.gameBtn = {...btnState};
	};
	showResult = (calback, n) => {
		this.result = [...this.result.slice(0, this.result.length - 1)];
		this.result = [...this.result, this.games[n]];
		this.game(n + 1, calback);
	};
	game = async () => {
		const round = this.games.length;
		for (let i = 0; i < round; i++) {
			this.result = [...this.result, 'loading...'];
			await sleep(1000);
			this.result = [...this.result.slice(0, this.result.length - 1)];
			this.result = [...this.result, this.games[i]];
		}
	};
}
