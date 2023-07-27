const store = {
	state: {},
	listeners: [],
	getState() {
		return this._state;
	},

	setState(newState) {
		this._state = newState;
		this.listeners.forEach((listener) => listener());
	},

	subscribe(listener) {
		this.listeners.push(listener);
	},
};

store.subscribe(() => {
	console.log("상태가 변경되었습니다 : ", store.getState());
});

export default store;
