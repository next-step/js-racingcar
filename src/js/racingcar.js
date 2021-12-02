const initialState = {
  raceCarList: [],
  raceCnt: 0,
};

export default class racingCar {
  constructor({
    $raceCarListInp,
    $raceCarListBtn,
    $raceCntInp,
    $raceCntBtn,
    $raceGround,
    $raceCntContainer,
    $resultContainer,
  }) {
    this.$raceCarListInp = $raceCarListInp;
    this.$raceCarListBtn = $raceCarListBtn;
    this.$raceCntInp = $raceCntInp;
    this.$raceCntBtn = $raceCntBtn;
    this.$raceGround = $raceGround;
    this.$raceCntContainer = $raceCntContainer;
    this.$resultContainer = $resultContainer;
    this.state = initialState;
  }

  bindEvents() {
    this.$resultContainer.style.display = "none";
    this.$raceCntContainer.style.display = "none";
    this.$raceCarListBtn.addEventListener(
      "click",
      this.onClickRaceCarListBtn.bind(this)
    );
    this.$raceCntBtn.addEventListener(
      "click",
      this.onClickRaceCntBtn.bind(this)
    );
  }

  onClickRaceCarListBtn() {
    const splitCarList = this.$raceCarListInp.value
      .split(",")
      .map((ele) => ele.trim());
    const isValue1_5 = splitCarList.every(
      (raceCarName) => raceCarName.length >= 1 && raceCarName.length <= 5
    );
    if (isValue1_5) {
      this.$raceCntContainer.style.display = "block";
      return (this.state.raceCarList = splitCarList);
    }
    alert("자동차의 이름은 1자이상, 5자 이하만 가능합니다.");
    this.state.raceCarList = [];
  }

  onClickRaceCntBtn() {
    if (this.$raceCntInp.value < 1)
      return alert(
        "입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다."
      );
    this.state.raceCnt = Number(this.$raceCntInp.value);
    this.showRacingCarGround();
  }

  getWinner($carPlayers, raceCarList) {
    const $winnerTitle = document.querySelector("#winner-title");
    const scoreList = Array.from($carPlayers).map(
      ($player) => $player.children.length - 1 //이름칸인 div를 뺀 나머지 값이 결과값이다.
    );
    const maxScore = Math.max.apply(null, scoreList);
    const racingResult = raceCarList.filter(
      (ele, i) => scoreList[i] === maxScore
    );
    $winnerTitle.textContent = `🏆 최종 우승자: ${racingResult.join(",")} 🏆`;
  }

  showRacingCarGround() {
    const temp = this.state.raceCarList.reduce((prev, cur) => {
      return (prev += `<div class="mr-2 player-zone">
        <div class="car-player">${cur}</div>
      </div>`);
    }, "");
    this.$raceGround.innerHTML = temp;
    this.racing();
  }

  showSpinner($player) {
    //스피너 추가
    const PARENT_DIV = document.createElement("div");
    const CHILD_DIV = document.createElement("div");
    const SPAN = document.createElement("span");
    PARENT_DIV.classList.add(
      "spinner-wrapper",
      "d-flex",
      "justify-center",
      "mt-3"
    );
    CHILD_DIV.classList.add("relative", "spinner-container");
    SPAN.classList.add("material", "spinner");
    $player.appendChild(PARENT_DIV);
    PARENT_DIV.appendChild(CHILD_DIV);
    CHILD_DIV.appendChild(SPAN);
  }

  removeSpinner($player) {
    const $spinner = $player.querySelector(".spinner-wrapper");
    $player.removeChild($spinner);
  }

  showRacing(showSpinner, removeSpinner, $carPlayers) {
    $carPlayers.forEach(($player) => {
      const goForward = Math.ceil(Math.random() * 10) >= 4 ? true : false; //true면 앞으로가기, false면 제자리
      if (goForward) {
        removeSpinner($player);
        const DIV = document.createElement("div");
        DIV.classList.add("forward-icon", "mt-2");
        DIV.textContent = "⬇️️";
        $player.appendChild(DIV);
        showSpinner($player);
      }
    });
  }

  racing() {
    const $carPlayers = document.querySelectorAll(".player-zone");
    const raceCnt = this.state.raceCnt;
    let round = 1;
    $carPlayers.forEach(($player) => this.showSpinner($player));

    const timer = setInterval(
      function (
        showSpinner,
        removeSpinner,
        showRacing,
        getWinner,
        raceCarList,
        $resultContainer
      ) {
        round++;
        if (round > raceCnt) {
          //레이스가 끝나면 함수종료
          $carPlayers.forEach(($player) => removeSpinner($player));
          getWinner($carPlayers, raceCarList);
          clearInterval(timer);
          $resultContainer.style.display = "flex";
        } else {
          showRacing(showSpinner, removeSpinner, $carPlayers);
        }
      },
      1000,
      this.showSpinner,
      this.removeSpinner,
      this.showRacing,
      this.getWinner,
      this.state.raceCarList,
      this.$resultContainer
    );
  }
}
