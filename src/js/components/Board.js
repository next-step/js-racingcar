/**
 * @param {Element} $el
 * @param props
 * @param {[string]} props.carNames
 * @param {number} props.count
 * @param {function} props.setWinnerCarNames
 */
export function Board($el, props) {

    const cars = props.carNames.map(carName => {
        return `
           <div class="mr-2" data-test="car">
                <div class="car-player">${carName}</div>
            </div> 
        `;
    });

    const render = () => {
        $el.innerHTML = `
            <section class="d-flex justify-center mt-5">
                <div class="mt-4 d-flex">
                    ${cars.join('')}
                </div>
            </section>
        `;
    };

    render();
}
