import {renderRacing} from "./renderRacing.js"


const setTrialTimesEvent = () => {
    const trialButton = document.querySelector("#trialButton");
    const trialInput = document.querySelector("#trialInput")
    trialButton.addEventListener("click", function(){
        trialInput.setAttribute('disabled','disabled')
        renderRacing();
    })
}

export { setTrialTimesEvent }