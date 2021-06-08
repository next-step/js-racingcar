export default class RacingView {
	constructor(racingModel) {
		this.model = racingModel;
		this.hideViews();
	}

    hideViews() {
        const $tryNumField = document.querySelectorAll('fieldset')[1];
        const $sections = document.querySelectorAll('section');
        const $racingBoard = $sections[1];
        const $resultBoard = $sections[2];

        $tryNumField.style.visibility = 'hidden';
        $racingBoard.style.visibility = 'hidden';
        $resultBoard.style.visibility = 'hidden';
    }

	querySelector(selector) {
		return document.querySelector(selector);
	}

	querySelectorAll(selector) {
		return document.querySelectorAll(selector);
	}

	changeVisibility(node, isVisible) {
		node.style.visibility = isVisible ? 'visible' : 'hidden';
	}

	renderWinners(model) {
        const winners = model.getWinners();
        const $resultBoard = document.querySelectorAll('section')[2];
        const $h2 = $resultBoard.querySelector('h2');
        $h2.innerText = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;
        this.changeVisibility($resultBoard, true);
	}

	retry() {
        const $inputs = document.querySelectorAll('input');
        const $nameInput = $inputs[0];
        const $tryNumInput = $inputs[1];
        $nameInput.value = '';
        $tryNumInput.value = '';

        const $board = document.querySelector('.mt-4');
        $board.innerHTML = '';
		this.hideViews();
	}
}
