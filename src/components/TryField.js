const tryField = () => {
  return `
    <fieldset>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input id="try-field-input" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button id="try-field-btn" type="button" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  `;
};

export default tryField;
