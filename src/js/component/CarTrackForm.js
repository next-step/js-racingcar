export class CarTrackForm {
    cars = [];
    constructor() {
        this.$element = document.querySelector("#car-track-area");
        this.#renderer();
        this.#mounted();
        this.#setEvent();
    }

    #renderer() {
        this.$element.innerHTML = this.getCarTrackForm();
    }

    #mounted() {}

    #setEvent() {}

    getCarTrackForm() {
        return `<div class="mt-4 d-flex">
        ${cars
            .map(
                (car) => `
            <div class="mr-2"> ${this.getPlayerTemplate(car.name)} </div>
        `
            )
            .join("")}`;
    }

    getPlayerTemplate(player) {
        return `<div class="car-player">${player}</div>`;
    }

    getForwardTemplate() {
        return `<div class="forward-icon mt-2">⬇️️</div>`;
    }

    getSpinnerTemplate() {
        return `<div class="d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                        <span class="material spinner"></span>
                    </div>
                </div>`;
    }
}
