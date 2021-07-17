// export default class Model {
// 	constructor() {
// 		this.heading = 'Hello';

// 	}
// }

function HeadingState() {
	var self = this;
	this.state = new HelloState(self);
	this.changeState = function () {
		self.state.next();
	};
	this.getValue = function () {
		return self.state.value;
	};
}

function HelloState(container) {
	var self = this;
	this.container = container;
	this.value = 'currentState: Hello';
	container.state = this;
	this.next = function () {
		return new WorldState(self.container);
	};
}

function WorldState(container) {
	var self = this;
	this.container = container;
	this.value = 'World';
	container.state = this;
	this.next = function () {
		return new HelloState(self.container);
	};
}

export default function Model() {
	var self = this;
	var state = new HeadingState();
	var heading = state.getValue();
	this.observers = [];
	this.registerObserver = function (observer) {
		self.observers.push(observer);
	};
	this.notifyAll = function () {
		self.observers.forEach(function (observer) {
			observer.update(self);
		});
	};
	this.changeHeading = function () {
		console.log('change heading');
		state.changeState();
		self.heading = state.getValue();
	};
	Object.defineProperty(this, 'heading', {
		get: function () {
			return heading;
		},
		set: function (value) {
			heading = value;
			this.notifyAll();
		},
	});
}
