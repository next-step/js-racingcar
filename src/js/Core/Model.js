/**
 * observer 패턴
 * model은 observable 인터페이스 상속
 * View클래스를 인스턴스화 한 객체를 observer로 관리하면서
 * notifyAll 메서드를 이용해 모든 view를 리랜더링 하도록 하는 패턴
 */
export default class Model {
	constructor(state) {
		this.observers = [];
		this.state = state;
	}
	get state() {
		return this._state;
	}
	set state(args) {
		this._state = args;
		this.notifyAll();
	}
	notifyAll = () => {
		const observers = this.observers;
		for (const ob of observers) {
			ob.update(this);
		}
	};
	registerObserver = (observer) => {
		this.observers.push(observer);
	};
}
