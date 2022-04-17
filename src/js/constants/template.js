const ATTEMPT_COUNT_INPUT = `<p>시도할 횟수를 입력해주세요.</p>
<div class="d-flex">
  <input type="number" autofocus id="attempt-count-input" class="w-100 mr-2" placeholder="시도 횟수" />
  <button type="button" id="attempt-count-submit" class="btn btn-cyan">확인</button>
</div>`;
const RACING_PROGRESS_VIEW = `<div class="mt-4 d-flex racing-container"> </div>`;

const TEMPLATE = Object.freeze({
  ATTEMPT_COUNT_INPUT,
  RACING_PROGRESS_VIEW,
});

export default TEMPLATE;
