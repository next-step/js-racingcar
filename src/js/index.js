`
<fieldset data-props="game-try-count-field">
<p>시도할 횟수를 입력해주세요.</p>
<div class="d-flex">
  <input type="number" class="w-100 mr-2" placeholder="시도 횟수" data-props="game-try-count-input" />
  <button type="button" class="btn btn-cyan" data-props="game-try-count-confirm-button">확인</button>
</div>
</fieldset>
``
<section class="d-flex justify-center mt-5" data-props="game-section">
<div class="mt-4 d-flex">
  <div class="mr-2">
    <div class="car-player">EAST</div>
    <div class="forward-icon mt-2">⬇️️</div>
    <div class="forward-icon mt-2">⬇️️</div>
  </div>
  <div class="mr-2">
    <div class="car-player">WEST</div>
    <div class="forward-icon mt-2">⬇️️</div>
  </div>
  <div class="mr-2">
    <div class="car-player">SOUTH</div>
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </div>
  <div class="mr-2">
    <div class="car-player">NORTH</div>
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </div>
</div>
</section>
<section class="d-flex justify-center mt-5" data-props="result-section">
<div>
  <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
  <div class="d-flex justify-center">
    <button type="button" class="btn btn-cyan">다시 시작하기</button>
  </div>
</div>
</section>
`;
