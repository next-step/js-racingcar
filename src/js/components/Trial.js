import { MAX_TRIAL_NUMBER } from '../constants.js';
import observer from '../core/observer.js';
import { store } from '../store/index.js';
import { makeRandomNumber, waitUntil } from '../utils/index.js';
import MoveSubmitButton from './button/moveSubmitButton.js';
import MoveInput from './input/moveInput.js';

class Trial {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();

    this.$moveInput = $target.querySelector('[data-id=move-input]');
    this.$moveButton = $target.querySelector('[data-id=move-submit]');

    new MoveInput({
      $target: this.$moveInput,
      props: {
        onSubmitTrials: this.onSubmitTrials,
      },
    });

    new MoveSubmitButton({
      $target: this.$moveButton,
      props: {
        makeNewRacingMap: this.makeNewRacingMap,
        onSubmitTrials: this.onSubmitTrials,
      },
    });

    observer.observe(() => {
      this.render();
    });
  }

  getProgressOrNot = () => {
    return makeRandomNumber() > 4;
  };

  makeNewRacingMap = (prevRacingMap) => {
    if (!prevRacingMap.size) return prevRacingMap;

    return Array.from(prevRacingMap).reduce((map, [key, values]) => {
      map.set(key, [...values, this.getProgressOrNot()]);
      return map;
    }, new Map());
  };

  getCarNameInCarId = (carId) => {
    return carId.split('-')[0];
  };

  getRacingWinner = ({ racingMap, trialNumber }) => {
    if (!racingMap || !racingMap.size) return false;

    return [...racingMap.keys()]
      .map((carId) => {
        const progressArray = racingMap.get(carId);
        if (
          progressArray.filter((el) => el === true).length ===
          Number(trialNumber)
        ) {
          return this.getCarNameInCarId(carId);
        }
      })
      .filter((el) => Boolean(el));
  };

  //*TODO: 렌더 후 업데이트가 아닌 한번에 실행 하고 밀어넣는 방식으로 변경하기
  async componentUpdated() {
    const { racingMap, trialNumber, isVisibleProgress, isRacingEnd } =
      store.state;

    const winner = this.getRacingWinner({ racingMap, trialNumber });

    if (isRacingEnd || !isVisibleProgress) return;

    if (winner.length) {
      return store.setState({
        isRacingEnd: true,
        winners: winner.join(','),
        isVisibleResult: true,
      });
    }

    await waitUntil(700);

    store.setState({
      racingMap: this.makeNewRacingMap(racingMap),
    });
  }

  onSubmitTrials = () => {
    const { racingMap, trialNumber } = store.state;
    const newRacingMap = this.makeNewRacingMap(racingMap);

    if (trialNumber > MAX_TRIAL_NUMBER) {
      alert('30회 이하의 시도를 입력해주세요');
      return;
    }

    if (!trialNumber) return;

    store.setState({
      isVisibleProgress: true,
      racingMap: newRacingMap,
    });
  };

  template() {
    return /*html*/ `
      <p class="move-explanation">시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2 move-input" placeholder="시도 횟수" data-id="move-input"/>
        <button type="button" class="btn btn-cyan move-submit-button" data-id="move-submit">확인</button>
      </div>
      
    `;
  }

  render() {
    this.componentUpdated();
  }
}

export default Trial;
