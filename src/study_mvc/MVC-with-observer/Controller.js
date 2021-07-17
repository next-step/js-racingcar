export default class Controller {
	constructor(model) {
		this.model = model;
	}
	keyPressHandler = (input) => (e) => {
		if (e.code.toLowerCase() !== 'enter') return;
		if (!input.value) return;
		this.model.submit(input);
	};
	clickHandler = (input) => () => {
		if (!input.value) return;
		this.model.submit(input);
	};
	gameClickHandler = (gameStarBtn) => () => {
		gameStarBtn.disabled = true;
		this.model.game(0, () => {
			gameStarBtn.disabled = false;
		});
	};
}
