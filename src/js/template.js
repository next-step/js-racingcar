export const carTemplate = ({ id, name }) => {
    return `
    <div id="car-${id}" class="mr-2">
        <div class="car-player">${name}</div>
        <div class="forward-icon-wrap"></div>
        ${spinnerTemplate()}
    </div>  
    `;
};

export const forwardTemplate = () => {
    return `
    <div class="forward-icon mt-2">⬇️️</div>
    `;
};

const spinnerTemplate = () => {
    return `
    <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
            <span class="material spinner"></span>
        </div>
    </div>
    `;
};

export const winnerTemplate = (winners) => {
    return `
    <h2>🏆 최종 우승자: ${winners.join(', ')} 🏆</h2>
    <div class="d-flex justify-center">
        <button type="button" id="restart-button" class="btn btn-cyan">다시 시작하기</button>
    </div>
    `
};
