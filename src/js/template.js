// eslint-disable-next-line import/prefer-default-export
export const templateRaceLapFieldset = () => {
  return `
    <fieldset>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" id="race-lap-input" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="button" id="race-lap-submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  `;
};
