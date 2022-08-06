import MatchNumber from "../js/state/MatchNumber.js";
import RacingCarInfo from "../js/state/RacingCarInfo.js";
import RunRacing from "./RunRacing.js";

class PrepareRacing {
  static MIN_CARNAME_SIZE = 1; //check
  static MAX_CARNAME_SIZE = 5; //check

  constructor() {
    this.initEventListeners();
    this.runRacing = new RunRacing();
  }

  testCarNameSize(carName) {
    return (
      PrepareRacing.MIN_CARNAME_SIZE <= carName.trim().length &&
      carName.trim().length <= PrepareRacing.MAX_CARNAME_SIZE
    );
  }

  openInputNumberOfMatches(e) {
    //여기까지가 open
    //view
    e.target.insertAdjacentHTML(
      "beforeend",
      `<fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" id="try-count-input" class="w-100 mr-2" placeholder="시도 횟수" />
          <button id="try-count-btn" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>`
    );
  }

  submitCarNames(e) {
    //경기 참가 자동차명을 입력하면, 자동차명이 규칙에 맞는지 확인한 후, 경기횟수를 입력하는 폼을 열어준다.
    if (!e.target[1].value) {
      return;
    }
    const carNames = e.target[1].value.split(",");
    const invalidCarName = carNames.find((v) => !this.testCarNameSize(v));
    if (invalidCarName) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingCarInfo.setRaceParticipateCar(carNames);
    this.openInputNumberOfMatches(e);
  }

  submitNumberOfRaces(e) {
    //경기횟수를 입력하면 그에 해당하는 template을 생성하고 경기를 진행한다.
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);

    this.runRacing.matchFormGenerator(); //다음껏
    this.runRacing.matchProgress(); //다음것
  }

  prepareGame = (e) => {
    //자동차이름과 경기회수 입력 이벤트를 판단한다.
    e.preventDefault();
    if (e.submitter.id == "car-name-btn") {
      this.submitCarNames(e);
    } else {
      this.submitNumberOfRaces(e);
    }
  };

  initEventListeners() {
    //입력 폼을 가져온다.
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default PrepareRacing;
