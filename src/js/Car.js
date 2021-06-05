export default class Car {
    constructor(name, index) {
        this.name = name;
        this.index = index;
        this.random = [];
        this.renderContainer();
    }

    renderContainer() {
        const container = document.createElement('div');
        container.className = 'mr-2 car-container';
        container.innerHTML = `<div class="car-player">${this.name}</div>`;

        const $board = document.querySelector('.mt-4');
        $board.appendChild(container);
    }

    setRandom(num) {
        this.random.push(num);

        if (num >= 4) {
            this.renderForward();
        }
    }

    renderForward() {
        const forward = document.createElement('div');
        forward.className = 'forward-icon mt-2';
        forward.innerText = '⬇️';

        const $container = document.querySelectorAll('.car-container')[this.index];
        $container.appendChild(forward);
    }

    getName() {
        return this.name;
    }

    getForwardNum() {
        return this.random.filter((num) => num >= 4).length;
    }
}
