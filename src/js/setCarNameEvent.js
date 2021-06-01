import { setTrialTimesEvent } from "./setTrialTimesEvent.js"

const setCarNameEvent = () =>{
    let getCarNameBtn = document.querySelector("#carNameButton");
    let carNameInput = document.querySelector("#carNameInput");
    getCarNameBtn.addEventListener("click", function() {
        carNameInput.setAttribute("disabled","disabled")
        renderTrialTime();
    })
}

const renderTrialTime = () => {
    let trialSection = document.querySelectorAll("fieldset")[1]
    trialSection.innerHTML = `
    <p>시도할 횟수를 입력해주세요.</p><div class="d-flex">
    <input type="number" id="trialInput" class="w-100 mr-2" placeholder="시도 횟수" />
    <button type="button" id="trialButton"  class="btn btn-cyan">확인</button>
    </div>
    `
    setTrialTimesEvent();
}


export { setCarNameEvent } ;