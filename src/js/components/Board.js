/**
 * @param {Element} $el
 * @param props
 * @param {[string]} props.carNames
 * @param {number} props.count
 * @param {function} props.setWinnerCarNames
 */
import {BoardItem} from './BoardItem.js';
import {$} from '../utils/selector.js';

export function Board($el, props) {

    const render = () => {
        const cars = props.carNames.map(carName => {
            return `
               <div class="mr-2" data-component="BoardItem-${carName}" data-test="car">
               </div> 
            `;
        });

        $el.innerHTML = `
            <section class="d-flex justify-center mt-5">
                <div class="mt-4 d-flex">
                    ${cars.join('')}
                </div>
            </section>
        `;

        const {carNames, count} = props;
        carNames.forEach(carName => {
            new BoardItem($(`[data-component="BoardItem-${carName}"]`, $el), {carName, count});
        });
    };

    render();
}
