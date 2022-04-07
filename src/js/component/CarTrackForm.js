<<<<<<< HEAD
export class CarTrackForm {
    cars = [];
    constructor() {
        this.$element = document.querySelector("#car-track-area");
        this.#renderer();
        this.#mounted();
        this.#setEvent();
=======
export default class CarTrackForm {
        
    constructor(racing, props) {
        this.racing = racing;
        this.$element = document.querySelector("#car-track-area");
        this.onForwarding = props.onForwarding;

        this.#renderer();
>>>>>>> minsiki
    }

    #renderer() {
        this.$element.innerHTML = this.getCarTrackForm();
    }

    getCarTrackForm() {
        return `<div class="mt-4 d-flex">
        ${cars
            .map(
                (car) => `
<<<<<<< HEAD
            <div class="mr-2"> ${this.getPlayerTemplate(car.name)} </div>
=======
            <div class="car mr-2"> 
                ${this.getPlayerTemplate(car.value)} 
                ${this.getSpinnerTemplate()}
            </div>
>>>>>>> minsiki
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
        return `<div class="spinner-area d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                        <span class="material spinner"></span>
                    </div>
                </div>`;
    }
<<<<<<< HEAD
=======

    onForward(index) {
        document.querySelectorAll(".car")[index]
        .querySelector(".car-player")
        .insertAdjacentHTML("afterend", this.getForwardTemplate());
    }

    removeSpinner() {
        document.querySelectorAll(".spinner-area").forEach((spinner) => {
            spinner.remove();
        })
    }
>>>>>>> minsiki
}
