const Message = {
    DEFAULT_POSITION: 0,
    CAR_RUN_UNIT: 1,
    RUN_THRESHOLD: 4,
    CAR_NAME_MIN_LENGTH: 1,
    CAR_NAME_MAX_LENGTH: 5,
    RACE_COUNT: 5,
    WINNER: (winners, position) => `축하합니다🥳: ${winners.join(', ')}, ${position}`,
    ERROR: {
        CAR_MAX_LENGTH: '자동차 이름은 5글자 이하만 가능하다.',
        CAR_MIN_LENGTH: '자동차 이름을 1글자 이상만 가능하다.',
        CAR_NAME_ALPHABET: '자동차 이름은 영어 문자열만 가능하다.',
        COUNT_MAX: '자동차 횟수는 최대 100를 넘지 않는다.',
        COUNT_MIN: '자동차 횟수는 최소 0이상 이여야 된다.',
    },
}
module.exports = Message;