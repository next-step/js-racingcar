export class CarTrackForm {
    racing;
    constructor(racing) {
        this.racing = racing;
        this.$element = document.querySelector("#car-track-area");
    }

    #renderer() {
        this.$element.innerHTML = this.getCarTrackForm();
    }

    #mounted() {}

    #setEvent() {}

    getCarTrackForm() {
        console.log(this.racing.cars);
        return `<div class="mt-4 d-flex">
        ${this.racing.cars
            .map(
                (car) => `
            <div class="mr-2"> ${this.getPlayerTemplate(car.value)} </div>
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

    initialize() {
        this.#renderer();
        this.#mounted();
        this.#setEvent();
    }
}
