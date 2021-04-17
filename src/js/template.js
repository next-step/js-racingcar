export const winnerTemplate = (winners) => {
    return `
    <h2>🏆 최종 우승자: ${winners.join(', ')} 🏆</h2>
    <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
    </div>
    `
}
