import { renderReset } from "./renderReset.js";

const renderResult = (count) => {
    let carNode = document.querySelectorAll(".carNode")
    let resultDom = document.querySelector("#result")
    let winners = [];
    carNode.forEach(function(v){
        v.children.length-2 == count ? winners.push(v.children[0].textContent) : "";
    })
    console.log(winners)
    let winnerString = winners.join(",")

    let newDiv = document.createElement("div")
    newDiv.innerHTML = `
    <h2>🏆 최종 우승자: ${winnerString} 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" id="reset" class="btn btn-cyan">다시 시작하기</button>
    </div>
    `
    resultDom.appendChild(newDiv)
    setTimeout("alert('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇')", 1000);
    document.querySelector("#reset").addEventListener("click", function(v){
        renderReset();
    })
}


export { renderResult }