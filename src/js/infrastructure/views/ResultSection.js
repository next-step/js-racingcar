const ResultSection = ({ RacingGame }) => {
  if (RacingGame.gameFinishedResult() === null) return /*html */ `<section></section>`;

  return /*html*/ `
    <section class="d-flex justify-center mt-5 d-none" data-props="result-section">
      <div>
        <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    </section>`;
};

export default ResultSection;
