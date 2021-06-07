import {$} from './../utils/selector.js';

/**
 * @param {Element} $el
 * @param props
 * @param {function} props.setCarNamesAndCount
 */
export function Form($el, props) {

    const state = {
        carNamesText: '',
        count: 1,
        isDoneTypingCount: false,
    };

    const bindEvents = () => {
        $el.addEventListener('click', ({target: {dataset: {action}}}) => {
            const $form = $('form', $el);
            if (action === 'enterCarNames') {
                enterCarNames(new FormData($form).get('carNamesText'));
            }

            if (action === 'enterCount') {
                enterCount(new FormData($form).get('count'));
            }
        });
    };

    const enterCarNames = (carNamesText) => {
        //todo Validate carNamesText

        state.carNamesText = carNamesText;
        render();
    };

    const enterCount = (count) => {
        //todo Validate count

        state.count = count;
        state.isDoneTypingCount = true;

        dispatchCarNamesAndCount();
        render();
    };

    const dispatchCarNamesAndCount = () => {
        const {carNamesText, count} = state;
        props.setCarNamesAndCount({
            carNames: carNamesText.split(', '),
            count: Number(count),
        });
    };

    const render = () => {
        const {carNamesText, count, isDoneTypingCount} = state;
        const isDoneTypingCarNames = !!carNamesText;

        $el.innerHTML = `
            <section class="d-flex justify-center mt-5">
                <form>
                    <fieldset>
                        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
                        <p>
                            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br/>
                            예시) EAST, WEST, SOUTH, NORTH
                        </p>
                        <div class="d-flex">
                            <input type="text" class="w-100 mr-2" placeholder="자동차 이름" name="carNamesText" ${isDoneTypingCarNames && 'disabled'} value="${carNamesText}" data-test="names-input"/>
                            <button type="button" class="btn btn-cyan" data-action="enterCarNames" ${isDoneTypingCarNames && 'disabled'} data-test="names-input-button" >확인</button>
                        </div>
                    </fieldset>
                    <fieldset style="display: ${isDoneTypingCarNames ? 'block' : 'none'}">
                        <p>시도할 횟수를 입력해주세요.</p>
                        <div class="d-flex">
                            <input type="number" class="w-100 mr-2" placeholder="시도 횟수" name="count" ${isDoneTypingCount && 'disabled'} value="${count}" data-test="count-input"/>
                            <button type="button" class="btn btn-cyan" data-action="enterCount" ${isDoneTypingCount && 'disabled'} data-test="count-input-button">확인</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        `;
    };

    render();
    bindEvents();
}
