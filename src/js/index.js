const $ = (selector) => document.querySelector(selector)
const $All = (selector) => document.querySelectorAll(selector)

const [carButtonDom,tryButtonDom] = $All(".btn-cyan")
const [carNameDom, tryNumberDom] = $All('.w-100');
const progressTitle = $('.mt-4');
const resultDom = $All('.mt-5')[2];



let max=-Infinity;
let maxCarName = [];
let carNameArray,tryNumber,isGo,countArray={};
let carMovingDom;

const splitCarName = (val)=>val.split(',');

const carButtonEvent = carButtonDom.addEventListener('click',()=>{
  carNameArray = splitCarName(carNameDom.value);
})

const tryButtonEvent = tryButtonDom.addEventListener('click',()=>{
  tryNumber = tryNumberDom.value;
  startRacing(tryNumber,carNameArray)
})

const startRacing = (tryNumber,carName)=>{
  let count=0;
  carName.map(val => progressTitle.innerHTML += setting(val));
  carMovingDom = $All('.car-player');
  timerCheck(count,carName);
}

const timerCheck = (count,carName)=>{
  let timer = setInterval(()=> {
    isGo = carName.map(() => Math.floor(Math.random() * 10) >= 4 ? true : false);
    goCarMove(carNameArray, isGo);
    count++;
    if (count === Number(tryNumber)) {
      clearInterval(timer);
      $All('.relative').forEach(x=>x.remove())
      checkWinner();
      resultDom.innerHTML = result(maxCarName);
      $All('.btn-cyan')[2].addEventListener('click',()=>{

        while ( progressTitle.hasChildNodes() )
        { progressTitle.firstChild.remove(); }

        while ( resultDom.hasChildNodes() )
        { resultDom.firstChild.remove(); }
        countArray={};
        max=-Infinity;
        maxCarName = [];

      })
    }
  },1000);
}

const goCarMove = (carNameArray,isGo)=>{
  carNameArray.map((val,idx) => {
    if (countArray[val] !== undefined)
      countArray[val] = isGo[idx] ? ++countArray[val] : countArray[val];
    else
      countArray[val] = isGo[idx] ? 1 : 0;
    addMovingDom(isGo,idx)
  })
}

const addMovingDom = (isGo,idx)=>{
  if(isGo[idx])
    carMovingDom[idx].insertAdjacentHTML('afterend',moving());
}

const setting = (carName)=>` <div class="mr-2">
            <div class="car-player">${carName}</div>
            <div class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          </div>`

const moving = ()=>`<div class="forward-icon mt-2">⬇️️</div>`

const result = (winnerName) =>`
          <div>
          <h2>🏆 최종 우승자: <span id="winners">${winnerName}</span> 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
          </div>
`

const checkWinner = ()=>{
  for(let idx in countArray){
    if(max < countArray[idx]){
      maxCarName = [];
      maxCarName.push(idx);
      max = countArray[idx];
    }
    else if(max === countArray[idx]){
      maxCarName.push(idx);
      max = countArray[idx];
    }
  }
}
