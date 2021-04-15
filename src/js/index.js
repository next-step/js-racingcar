import { MESSAGE, PROGRESS } from "./constant.js"

const app_div = document.querySelector("#app");

let cars = [];
let runningtime;


const init = () =>{
    addInputNameUI();
}

const addInputNameUI = () =>{
    const input_section = `<section class="d-flex justify-center mt-5" id="input_section">
    <form id="input_form">
      <fieldset>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex" id="carname">
          <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>    
    </form>
  </section>`
  app_div.insertAdjacentHTML("beforeend", input_section);
  const div_carname = app_div.querySelector("#carname");
  div_carname.addEventListener("click", setCarName);
}

const setCarName = ({target}) =>{
    const div_carname = app_div.querySelector("#carname");
    const names = div_carname.querySelector("input").value;
    const btn = div_carname.querySelector("button");
    if(target == btn){
        let flag = 1;
        cars = names.split(",").map((x) => x.trim());
        cars.forEach((x) => {
            if (flag && !(1 <= x.length && x.length <= 5)){
                alert(MESSAGE.CAR_NAME);
                flag = 0;
            }
        })
        if (!flag)
            return ;
        btn.setAttribute("disabled", true);
        addInputCountUI();
    }
}

const addInputCountUI = () =>{
    const count_field = `<fieldset id="count_filed">
                        <p>시도할 횟수를 입력해주세요.</p>
                        <div class="d-flex" id="count">
                            <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
                            <button type="button" class="btn btn-cyan">확인</button>
                        </div>
                    </fieldset>`;
    app_div.querySelector("#input_form").insertAdjacentHTML("beforeend", count_field);
    const input_count = document.querySelector("#count");
    input_count.querySelector("input").focus();
    input_count.addEventListener("click", setCount);
}

const setCount = ({target}) =>{
    const count_div = target.parentNode;
    const value = count_div.querySelector("input").value;
    const btn = count_div.querySelector("button");
    if(target == btn){
        runningtime = value;
        if (!runningtime){
            alert(MESSAGE.RUN_TIME);
            return ;
        }
        btn.setAttribute("disabled", true);
        addProcessUI();
    }
}

const addProcessUI = () => {
    let process_section = `<section class="d-flex justify-center mt-5" id="process_section">
                                <div class="mt-4 d-flex">\n` 
    for(let i = 0; i < cars.length; i++){
        process_section += `<div class="mr-2">
                                <div class="car-player">${cars[i]}</div>
                                ${PROGRESS.WAIT}
                            </div>\n`;
    }
    process_section += `</div> </section>`
    app_div.insertAdjacentHTML("beforeend", process_section);
    startGame();
}

const startGame = () => {
    let cnt = 0;
    let winner = new Array(cars.length);
    winner.fill(0);

    const timerId = setInterval(() => {
        let move = [];
        for(let j = 0; j < cars.length; j++){ 
            if (Math.floor(Math.random() * 10) >= 4)
            {
                winner[j]++;
                move.push(cars[j]);
            }
        }
        addProgressIcon(move, PROGRESS.MOVE, 0);
        addProgressIcon(cars, PROGRESS.WAIT, 0);

        if (++cnt == runningtime){
            clearInterval(timerId);
            addProgressIcon(cars, "", 1);
            addResultSection(winner);
        }
    }, 1000);
}

const addProgressIcon = (list, icon, isfinish) =>{
    const players = app_div.querySelectorAll(".car-player");
    players.forEach((x) => {
        if (list.indexOf(x.innerHTML) >= 0){
            const child = x.parentNode.querySelector(".mt-3");
            if (child != null)
                x.parentNode.removeChild(child);
            if(!isfinish)
                x.parentNode.insertAdjacentHTML("beforeend", icon);
        }
    })
}

const finishProgressIcon = (list) =>{
    const players = app_div.querySelectorAll(".car-player");
    players.forEach((x) => {
        if (list.indexOf(x.innerHTML) >= 0){
            const child = x.parentNode.querySelector(".mt-3");
            if (child != null)
                x.parentNode.removeChild(child);
        }
    })
}



const addResultSection = (winner) => {
    let result_section = `<section class="d-flex justify-center mt-5" id="result_section">
    <div>
      <h2>🏆 최종 우승자:`  
      
      for(let i = 0; i < winner.length; i++){
          if(winner[i] == Math.max.apply(null, winner)){
            result_section += ` ${cars[i]},`
          }
      }
      result_section = result_section.substring(0, result_section.length - 1);
      result_section += ` 🏆 </h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan" id="restart">다시 시작하기</button>
      </div>
    </div>
  </section>`
  app_div.insertAdjacentHTML("beforeend", result_section);

  setTimeout(() => alert(MESSAGE.CELEBRATE), 2000);

  let restart_btn = app_div.querySelector("#restart");
  restart_btn.addEventListener("click", restartGame);
}

const restartGame = () => {
    app_div.removeChild(app_div.querySelector("#process_section"));
    app_div.removeChild(app_div.querySelector("#result_section"));
    app_div.removeChild(app_div.querySelector("#input_section"));
    cars = [];
    runningtime = 0;
    addInputNameUI();
}


init();
