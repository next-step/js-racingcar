import { MESSAGE } from "./constant.js";
import { app_div } from "./index.js"
import { cars, addInputNameUI } from "./setCarName.js"

export const addResultSection = (distance) => {
    let result_section = `<section class="d-flex justify-center mt-5" id="result_section">
      <div>
        <h2>🏆 최종 우승자:${setWinnersName(distance)} 🏆 </h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan" id="restart">다시 시작하기</button>
        </div>
      </div>
    </section>`;
    
    app_div.insertAdjacentHTML("beforeend", result_section);
  
    setTimeout(() => alert(MESSAGE.CELEBRATE), 2000);
  
    let restart_btn = app_div.querySelector("#restart");
    restart_btn.addEventListener("click", restartGame);
  };

  const setWinnersName = (distance) => {
    let max = Math.max.apply(null, distance);
    let winners = "";
    for (let i = 0; i < distance.length; i++) {
      if (distance[i] == max) {
        winners += ` ${cars[i]},`;
      }
    }
    return winners.substring(0, winners.length - 1);
  }
  
  const restartGame = () => {
    const sections = app_div.querySelectorAll("section");
    for(let i = 0; i < sections.length; i++){
      app_div.removeChild(sections[i]);
    }
    addInputNameUI();
  };
