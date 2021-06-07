const STEP_RESULT = {
    FORWARD: 'FORWARD',
    STOP: 'STOP',
};

/**
 * @param {Element} $el
 * @param {string} props.carName
 * @param {number} props.count
 */
export function BoardItem($el, props) {

    const state = {
        stepResults: [],
    };

    const render = () => {
        const {carName} = props;

        const steps = state.stepResults.map(result => {
            if (result === STEP_RESULT.STOP) {
                return '';
            }
            return '<div class="forward-icon mt-2">⬇️</div>';
        });
        //todo loading 표시 처리

        $el.innerHTML = `
            <div class="car-player">${carName}</div>
            ${steps.join('')}
        `;
    };

    const racing = () => {
        while (state.stepResults.length < props.count) {
            forwardOrStop();
        }
    };

    const forwardOrStop = () => {
        const randomNumber = Math.floor(Math.random() * 10);

        if (randomNumber < 4) {
            state.stepResults.push(STEP_RESULT.STOP);
            return;
        }
        state.stepResults.push(STEP_RESULT.FORWARD);
        render();
    };

    render();
    racing();
}
