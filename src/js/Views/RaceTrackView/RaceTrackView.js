import { View } from "../../core/View.js";
import { OneTrack } from "./components/OneTrack.js";

// 여러 Track을 가지고 있는 RaceTrack이다.
// carName과 반복 Count를 갖고 있고, 반복 Count를 통해 moveForward를 발동시킬 여부를 결정한다.

// 하지만, View는 자신만의 state를 가질 수 없고 오직 Controller를 통해서만 받을 수 있다.
// View는 받은 parameter를 화면에 어떻게 그려줄지만 정의한다.

class RaceTrackView extends View {
  tracks;

  constructor() {
    const rootElement = document.getElementById('race-track');
    super(rootElement);
  }

  init = () => {
    this.rootElement.classList.add('hide');
    this.tracks = [];
    document.createElement('div').innerHTML = '';
  };

  readyRaceTrack = (carNames) => {
    const tracks = carNames.map((carName) => new OneTrack(carName));
    this.rootElement.appendChild(tracks);
    this.tracks = tracks;
  };

  refreshTrack = (results) => {
    results.forEach((isForward, i) => {
      if (isForward) {
        this.tracks[i].moveForward();
      }
    });
  }
}

const raceTrackView = new RaceTrackView();

export { raceTrackView };
