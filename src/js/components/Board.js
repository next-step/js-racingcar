/**
 * @param {Element} $el
 * @param props
 * @param {[string]} props.carNames
 * @param {number} props.count
 * @param {function} props.setWinnerCarNames
 */
export function Board($el, props) {

    const render = () => {
        $el.innerHTML = `
            <section class="d-flex justify-center mt-5">
                <div class="mt-4 d-flex">
                    <div class="mr-2" data-test="car">
                        <div class="car-player">EAST</div>
                        <div class="forward-icon mt-2">⬇️️</div>
                        <div class="forward-icon mt-2">⬇️️</div>
                    </div>
                    <div class="mr-2" data-test="car">
                        <div class="car-player">WEST</div>
                        <div class="forward-icon mt-2">⬇️️</div>
                    </div>
                    <div class="mr-2" data-test="car">
                        <div class="car-player">SOUTH</div>
                        <div class="d-flex justify-center mt-3">
                            <div class="relative spinner-container">
                                <span class="material spinner"></span>
                            </div>
                        </div>
                    </div>
                    <div class="mr-2" data-test="car">
                        <div class="car-player">NORTH</div>
                        <div class="d-flex justify-center mt-3">
                            <div class="relative spinner-container">
                                <span class="material spinner"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    };

    render();
}
