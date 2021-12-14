import { PROGRESS } from "../types/common.js";
import RenderService from "../services/RenderService.js";
import RacingService from "../services/RacingService.js";
import { $ } from "../utils/element.js";
const FORWARD_TEMPLATE = '<div class="forward-icon mt-2">⬇️️</div>';
const SPINNER_TEMPLATE = `
    <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
    </div>
`;
export default function RacingStadium({ $el, props }) {
    const state = {
        racingProgress: props.carNames.reduce((prev, carName) => ({
            ...prev,
            [carName]: {
                progresses: [],
                $wrapEl: null,
            },
        }), {}),
    };
    function startRacing() {
        const { carNames, numberOfTry } = props;
        carNames.forEach(carName => {
            state.racingProgress[carName].$wrapEl = $(`[data-car-player-wrap="${carName}"]`, $el);
        });
        for (let i = 0; i < numberOfTry; i += 1) {
            playRound(carNames);
        }
    }
    function playRound(carNames) {
        showSpinner(carNames);
        carNames.forEach(carName => {
            const progress = RacingService.getForwardOrStop();
            state.racingProgress[carName].progresses.push(progress);
        });
        hideSpinner(carNames);
    }
    function showSpinner(carNames) {
        carNames.forEach(carName => {
            const { $wrapEl } = state.racingProgress[carName];
            $wrapEl.insertAdjacentHTML('beforeend', SPINNER_TEMPLATE);
        });
    }
    function hideSpinner(carNames) {
        carNames.forEach(carName => {
            const { progresses, $wrapEl } = state.racingProgress[carName];
            $wrapEl.removeChild($wrapEl.children[$wrapEl.childElementCount - 1]);
            if (progresses[progresses.length - 1] === PROGRESS.FORWARD) {
                $wrapEl.insertAdjacentHTML('beforeend', FORWARD_TEMPLATE);
            }
        });
    }
    function render() {
        const { carNames } = props;
        const racingProgress = carNames.map(carName => `
            <div class="mr-2" data-car-player-wrap="${carName}">
                <div class="car-player">${carName}</div>
            </div>
        `).join('');
        RenderService.render({
            $el,
            template: `
                <section class="mt-5">
                    <div class="mt-4 d-flex justify-center">
                        ${racingProgress}
                    </div>
                </section>
            `,
        });
    }
    render();
    startRacing();
}
//# sourceMappingURL=RacingStadium.js.map