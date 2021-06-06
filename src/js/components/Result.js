/**
 * @param {Element} $el
 * @param props
 * @param {[string]} props.winnerCarNames
 */
export function Result($el, props) {

    const render = () => {
        $el.innerHTML = `
            <section class="d-flex justify-center mt-5">
                <div>
                    <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
                    <div class="d-flex justify-center">
                        <button type="button" class="btn btn-cyan">다시 시작하기</button>
                    </div>
                </div>
            </section>
        `;
    };

    render();
}
