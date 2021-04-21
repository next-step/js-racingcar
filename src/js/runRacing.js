import { renderResult } from "./renderResult.js"

const clearSpinner = () => {
    let spinners = document.querySelectorAll(".spinner-container");
    spinners.forEach(function(v) {
        v.innerHTML = ``
    })
}

const runRacing = () => {
    let trialCount = document.querySelector("#trialInput").value
    let carNode = document.querySelectorAll(".carNode")
    
    let maxCount = 0;
    let timerId = setTimeout(function tick() {
        carNode.forEach(function (v){
            let newDiv = document.createElement("div")
            newDiv.className = "forward-icon mt-2"
            newDiv.innerText = "⬇️"

            let randomTF = Math.floor(( Math.random() * 100 ) / 10) > 3 ? true : false
            if(randomTF){
                v.insertBefore(newDiv, v.children[1])
            }
            let length = v.children.length - 2;
            
            if(maxCount < length){
                maxCount = length
            }
        })


        if(maxCount < trialCount) {timerId = setTimeout(tick,1000)}
        else {
            clearSpinner();
            renderResult(trialCount);
        }
    })
}

export { runRacing }