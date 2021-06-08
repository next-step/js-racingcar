export default class CarView {
	constructor(carModel) {
		this.model = carModel;
		this.renderContainer(carModel);
	}

    renderContainer(model) {
        const container = document.createElement('div');
        container.className = 'mr-2 car-container';
        container.innerHTML = `<div class="car-player">${model.getName()}</div>`;

        const $board = document.querySelector('.mt-4');
        $board.appendChild(container);
    }

	renderForward() {
        const $container = document.querySelectorAll('.car-container')[this.model.getIndex()];
        const forward = document.createElement('div');
        forward.className = 'forward-icon mt-2';
        forward.innerText = '⬇️';
        $container.appendChild(forward);
	}
}
