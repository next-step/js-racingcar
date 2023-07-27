const createStore = (reducer, initialState) => {
	let state = initialState;
	const listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners.splice(listeners.indexOf(listener), 1);
		};
	};

	return {
		getState,
		dispatch,
		subscribe,
	};
};

export default createStore;
