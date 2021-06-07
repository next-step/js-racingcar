export default class Car {
    constructor(name, index) {
        this.name = name;
        this.index = index;
        this.random = [];
        this.renderContainer();
    }

    setRandom(num) {
        this.random.push(num);

        this.removeSpinner();
        if (num >= 4) {
            this.renderForward();
        }
    }

    renderContainer() {
        const container = document.createElement('div');
        container.className = 'mr-2 car-container';
        container.innerHTML = `<div class="car-player">${this.name}</div>`;

        const $board = document.querySelector('.mt-4');
        $board.appendChild(container);
    }

    renderSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'd-flex justify-center mt-3';
        spinner.innerHTML = '<div class="relative spinner-container"><span class="material spinner"></span></div>';

        const $container = document.querySelectorAll('.car-container')[this.index];
        $container.appendChild(spinner);
    }

    removeSpinner() {
        const $container = document.querySelectorAll('.car-container')[this.index];
        const $spinner = $container.lastChild;
        $container.removeChild($spinner);
    }

    renderForward() {
        const $container = document.querySelectorAll('.car-container')[this.index];
        const forward = document.createElement('div');
        forward.className = 'forward-icon mt-2';
        forward.innerText = '⬇️';
        $container.appendChild(forward);
    }

    getName() {
        return this.name;
    }

    getForwardNum() {
        return this.random.filter((num) => num >= 4).length;
    }
}
