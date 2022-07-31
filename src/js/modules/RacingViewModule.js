const RacingViewModule = () => {
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

  const readyForNextStep = ($beforeEl, $nextEl, $focusTarget) => {
    $beforeEl.disabled = true;
    $nextEl.hidden = false;
    if ($focusTarget) $focusTarget.focus();
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

  return {
    initializeView,
    readyForNextStep,
    renderRaceStatus,
    hiddenSpinner,
    renderWinners,
  };
};

export default RacingViewModule;
