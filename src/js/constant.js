
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