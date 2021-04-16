
export const NAME_MIN_LEN = 1;
export const NAME_MAX_LEN = 5;
export const RUN_MIN_LEN = 1;

export const MESSAGE = {
    CAR_NAME : `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${NAME_MIN_LEN}자이상, ${NAME_MAX_LEN}자 이하만 가능합니다.`,
    RUN_TIME : `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${RUN_MIN_LEN}이상이어야 합니다.`,
    CELEBRATE : `🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇`
}

export const PROGRESS = {
    WAIT : `<div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
        <span class="material spinner"></span>
    </div>
</div>`,
    MOVE : `<div class="forward-icon mt-2">⬇️️</div>`
}

export const INPUT_SECTION = {
    NAMES : `<section class="d-flex justify-center mt-5" id="input_section">
    <form id="input_form">
      <fieldset>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex" id="carname">
          <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>    
    </form>
  </section>`,
    COUNT : `<fieldset id="count_filed">
    <p>시도할 횟수를 입력해주세요.</p>
    <div class="d-flex" id="count">
        <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="button" class="btn btn-cyan">확인</button>
    </div>
</fieldset>`
}