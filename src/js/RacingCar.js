import {Form} from './components/Form.js';
import {Board} from './components/Board.js';
import {Result} from './components/Result.js';
import {$} from './utils/selector.js';

export function RacingCar($el) {

    const render = () => {
        $el.innerHTML = `
            <div data-component="Form"></div>         
            <div data-component="Board"></div>         
            <div data-component="Result"></div>         
        `;

        new Form($('[data-component="Form"]', $el));
        new Board($('[data-component="Board"]', $el));
        new Result($('[data-component="Result"]', $el));
    };

    render();
}
