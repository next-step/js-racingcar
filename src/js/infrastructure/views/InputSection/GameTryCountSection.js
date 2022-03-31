const GameTryCountFieldset = () => /*html*/ `
<fieldset data-props="game-try-count-field">
  <p>시도할 횟수를 입력해주세요.</p>
  <div class="d-flex">
    <input type="number" class="w-100 mr-2" placeholder="시도 횟수" data-props="game-try-count-input" />
    <button type="button" class="btn btn-cyan" data-props="game-try-count-confirm-button">확인</button>
  </div>
</fieldset>
`;

export default GameTryCountFieldset;
