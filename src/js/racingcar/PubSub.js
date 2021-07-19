export default class PubSub {
	constructor() {
		this.callbacks = {};
	}
	get callbacks() {
		return this._callbacks;
	}
	set callbacks(args) {
		this._callbacks = args;
	}
	subscribe(ev, calback) {
		(this.callbacks[ev] || (this.callbacks[ev] = [])).push(calback);
		return this;
	}
	publish(...args) {
		const ev = args[0];
		const restArgs = args.slice(1);
		let list, calls;
		if (!(calls = this.callbacks)) return this;
		if (!(list = this.callbacks[ev])) return this;
		for (const cb of list) {
			cb.call(this, ...restArgs);
		}
		return this;
	}
}

const getNow = () => {
	return new Date().getTime();
};

const rq = (round, startTime) => () => {
	if (round) {
		if (getNow() - startTime > 1000) {
			requestAnimationFrame(() => {
				console.log(round);
				pppsss.publish('test', round - 1);
			});
		} else {
			requestAnimationFrame(rq(round, startTime));
		}
	} else {
		console.log('end');
	}
};
const pppsss = new PubSub();
const callback = (round, randomTable) => {
	console.log('called');
	const startTime = getNow();
	requestAnimationFrame(rq(round, startTime));
};

pppsss.subscribe('test', callback);

pppsss.publish('test', 3);

// console.log(1);

// PubSub.subscribe('return1', function () {
// 	console.log(123);
// });

// PubSub.publish('return1');
