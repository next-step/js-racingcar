import observer from '../core/observer.js';
import { store } from '../store/index.js';
import { makeRandomNumber, waitUntil } from '../utils/index.js';
import MoveSubmitButton from './button/moveSubmitButton.js';
import MoveInput from './input/moveInput.js';

class TrialNumberRegister {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();

    this.$moveInput = $target.querySelector('[data-id=move-input]');
    this.$moveButton = $target.querySelector('[data-id=move-submit]');
    this.$moveWrapper = $target.querySelector('.move-wrapper');

    this.$moveWrapper.addEventListener('submit', (event) => {
      this.onSubmitTrials(event);
    });

    new MoveInput({
      $target: this.$moveInput,
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
        if (progressArray.filter((el) => el === true).length === Number(trialNumber)) {
          return this.getCarNameInCarId(carId);
        }
      })
      .filter((el) => Boolean(el));
  };

  onSubmitTrials = async (event) => {
    event.preventDefault();

    store.setState({
      isVisibleProgress: true,
    });

    while (!store.state.winners.length) {
      await waitUntil(1000);
      const racingMap = this.makeNewRacingMap(store.state.racingMap);
      store.setState({
        racingMap,
        winners: this.getRacingWinner({ racingMap, trialNumber: store.state.trialNumber }).join(','),
      });
    }
  };

  template() {
    return /*html*/ `
      <p class="move-explanation">시도할 횟수를 입력해주세요.</p>
      <form class="d-flex move-wrapper">
        <input type="number" class="w-100 mr-2 move-input" placeholder="시도 횟수" data-id="move-input"/>
        <button type="button" class="btn btn-cyan move-submit-button" data-id="move-submit">확인</button>
      </form>
    `;
  }

  render() {
    const { isVisibleTrial } = store.state;

    if (!isVisibleTrial) {
      this.$target.style.display = 'none';
      return;
    }

    this.$target.style.display = 'block';
  }
}

export default TrialNumberRegister;
