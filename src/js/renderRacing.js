import { runRacing } from "./runRacing.js"

const renderRacing = () => {
    const racingDom = document.querySelector("#racing")
    const carInput = document.querySelector("#carNameInput")
    // const trialInput = document.querySelector("#trialInput")

    let newHtml = ``;
    const cars = carInput.value.split(",")
    cars.map(function(car){
        newHtml +=
            `<div class="mr-2 carNode">
                <div class="car-player">${car}</div>
                <div class="d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                    <span class="material spinner"></span>
                    </div>
                </div>
            </div>
            `
    })
    racingDom.innerHTML = newHtml
    runRacing();
}

export { renderRacing }