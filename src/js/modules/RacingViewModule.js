import ValidationError from './ValidationError.js';
import racingData from './RacingProcessInfo.js';
import RacingModule from './RacingModule.js';

const RacingViewModule = (
  $racingInfoForm,
  $carNames,
  $goalPositionNumber,
  $raceStatusDiv,
  $raceWinnerDiv,
  $raceWinner
) => {
  const {
    checkFalsyName,
    getCarNames,
    checkTooLongName,
    moveRandom,
    getResultTryOnce,
    goRace,
  } = RacingModule();

  const initializeView = (initTargets) => {
    const DEFAULT_VALUE = {
      value: '',
      innerHTML: '',
      hidden: true,
      disabled: false,
      classList: 'mt-4 d-flex',
    };
    Object.keys(initTargets).forEach((attrKey) =>
      initTargets[attrKey].forEach(
        (el) => (el[attrKey] = DEFAULT_VALUE[attrKey])
      )
    );
  };

  const onInitialize = () => {
    racingData.initialize();

    initializeView({
      value: [$carNames.input, $goalPositionNumber.input],
      innerHTML: [$raceStatusDiv, $raceWinner.label],
      hidden: [$goalPositionNumber.field, $raceStatusDiv, $raceWinnerDiv],
      disabled: [$carNames.field, $goalPositionNumber.field],
      classList: [$raceStatusDiv],
    });
  };

  const onTypingCarName = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCompleteCarNames();
    }
  };

  const readyForNextStep = ($beforeEl, $nextEl, $focusTarget) => {
    $beforeEl.disabled = true;
    $nextEl.hidden = false;
    if ($focusTarget) $focusTarget.focus();
  };

  const onCompleteCarNames = () => {
    try {
      checkFalsyName($carNames.input.value);

      const namesArray = getCarNames($carNames.input.value);

      checkTooLongName(namesArray);

      racingData.setRaceReadyStatus(namesArray);

      readyForNextStep(
        $carNames.field,
        $goalPositionNumber.field,
        $goalPositionNumber.input
      );
    } catch (err) {
      if (err instanceof ValidationError) {
        err.errorEvent(err.message);
      } else {
        throw err;
      }
    }
  };

  const onStartRacing = async (e) => {
    e.preventDefault();
    racingData.setTryEndNumber(+e.target.goal_position_number_input.value);

    readyForNextStep($goalPositionNumber.field, $raceStatusDiv);

    const winners = await goRace(racingData, (data) => {
      const result = getResultTryOnce(data, moveRandom);
      renderRaceStatus($raceStatusDiv, result);
      return result;
    });

    hiddenSpinner($raceStatusDiv);
    renderWinners($raceWinnerDiv, $raceWinner.label, winners);
  };

  const getRaceStatusTemplate = ({ name, position }) => `<div class="mr-2">
            <div class="car-player">${name}</div>
            ${Array.from({ length: position })
              .map(() => `<div class="forward-icon mt-2">⬇️️</div>`)
              .join('')}
            <div class="relative spinner-container">
                <span class="material spinner"></span>
            </div>
          </div>`;

  const renderRaceStatus = ($el, raceData) => {
    $el.innerHTML = `<div class="mt-4 d-flex" >${raceData
      .map(getRaceStatusTemplate)
      .join('')}</div>`;
  };

  const hiddenSpinner = ($raceStatus) => {
    $raceStatus.classList.add('finished');
  };
  const renderWinners = ($wrapper, $renderTarget, raceData) => {
    $wrapper.hidden = false;
    $renderTarget.innerHTML = `🏆 최종 우승자: ${raceData
      .map(({ name }) => name.trim())
      .join()} 🏆`;
  };

  const addRaceStepEvent = () => {
    $carNames.input.addEventListener('keydown', onTypingCarName);
    $carNames.btn.addEventListener('click', onCompleteCarNames);
    $racingInfoForm.addEventListener('submit', onStartRacing);
    $raceWinner.btn.addEventListener('click', onInitialize);
  };

  return {
    addRaceStepEvent,
  };
};

export default RacingViewModule;
