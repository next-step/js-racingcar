export default class CarTrackForm {
        
    constructor(racing, props) {
        this.racing = racing;
        this.$element = document.querySelector("#car-track-area");
        this.onForwarding = props.onForwarding;
    }

    render() {
        this.$element.innerHTML = this.getCarTrackForm();
    }

    getCarTrackForm() {
        return `<div class="mt-4 d-flex">
        ${this.racing.cars
            .map(
                (car) => `
            <div class="car mr-2"> 
                ${this.getPlayerTemplate(car)} 
                ${this.getSpinnerTemplate()}
            </div>
        `
            )
            .join("")}`;
    }

    getPlayerTemplate(car) {
        return `<div id="${car.id}" class="car-player">${car.value}</div>`;
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

    onForward(car) {
        document.getElementById(car.id)
        .insertAdjacentHTML("afterend", this.getForwardTemplate());
    }

    removeSpinner() {
        document.querySelectorAll(".spinner-area").forEach((spinner) => {
            spinner.remove();
        })
    }

    reset() {
        this.$element.innerHTML = "";
        this.racing.cars = [];
    }
}