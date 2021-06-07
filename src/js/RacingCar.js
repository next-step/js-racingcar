import {Form} from './components/Form.js';
import {Board} from './components/Board.js';
import {Result} from './components/Result.js';
import {$} from './utils/selector.js';

/**
 * @param {Element} $el
 * @constructor
 */
export function RacingCar($el) {

    const state = {
        carNames: [],
        count: 0,
        winnerCarNames: [],
    };

    /**
     * @param {[string]} carNames
     * @param {number} count
     */
    const setCarNamesAndCount = ({carNames, count}) => {
        state.carNames = carNames;
        state.count = count;
        render();
    };

    const setWinnerCarNames = (winnerCarNames) => {
        state.winnerCarNames = winnerCarNames;
        render();
    };

    const render = () => {
        const {carNames, count, winnerCarNames} = state;
        const isEndRace = winnerCarNames.length > 0;

        if (!$el.innerHTML) {
            $el.innerHTML = `
                <div data-component="Form"></div>         
                <div data-component="Board"></div>         
                <div data-component="Result"></div>         
            `;

            new Form($('[data-component="Form"]', $el), {setCarNamesAndCount});
        }

        count && new Board($('[data-component="Board"]', $el), {carNames, count, setWinnerCarNames});
        isEndRace && new Result($('[data-component="Result"]', $el), {winnerCarNames});
    };

    render();
}
