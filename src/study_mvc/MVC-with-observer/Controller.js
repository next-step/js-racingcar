export default class Controller {
	constructor(model) {
		this.model = model;
	}

	keyPressHandler = (e) => {
		if (e.code.toLowerCase() !== 'enter') return;
		this.model.submit();
	};
	clickHandler = () => {
		this.model.submit();
	};
	inputChange = ({target}) => {
		this.model.changeInput(target.value);
	};
	gameClickHandler = () => {
		if (this.model.gameBtn.title === 'game-start') {
			this.model.setGameBtn({disabled: true, title: 'processing...'});
			this.model.game(0, () => {
				this.model.setGameBtn({disabled: false, title: 'gameEnd'});
			});
		} else if (this.model.gameBtn.title === 'gameEnd') {
			this.model.resetGame();
		}
	};
}
