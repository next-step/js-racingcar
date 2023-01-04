import { getState } from "../../Stores/global/global.js";
import { subscribe, dispatch, actions, RACE_STATES } from "../../Stores/race/index.js";
import { raceTrackView } from "../../Views/RaceTrackView/RaceTrackView.js";
import { executeNextRace } from './RaceTrackControllerUtils.js';

function startRace(raceState) {
  if (raceState.raceState !== RACE_STATES.DOING) { return; }

  const { iterationCount } = getState();

  if (raceState.raceCount < iterationCount) {
    progressRace(raceState);
    return;
  }

  dispatch(actions.DONE);
}

const RACE_INTERVAL_TIME = 1000;

function progressRace({ carStates }) {
  setTimeout(() => {
    const carShouldAdvanceResults = executeNextRace(carStates);
    raceTrackView.continueRace(carShouldAdvanceResults);
  }, RACE_INTERVAL_TIME);
}

subscribe(startRace);

// 결과가 끝나면 자동으로 결과를 보여줘야된다,,,
// 그렇게 하기 위해선 2가지 방법이 있다.
// 1. 이곳에 ResultController의 method를 불러와서 실행시켜주는 방법.
// -> 이 방법은 컨트롤러끼리의 결합도가 높아진다. 반드시 해당 파일의 해당 메소드가 아니면 안되기 때문, 하지만 dispatch를 이용하면, 간접적으로 실행시키게 되어 결합도가 낮아진다.
// 2. subscribe를 시켜놓고 dispatch마다 반응하도록 한다. 별도의 state를 추가해 그 state 변화시 반응하도록 유도 가능
