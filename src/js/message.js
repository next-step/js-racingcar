export const ERROR =  {
    NAME_LENGTH : () => {
        alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
    },
    RACING_CNT : () => {
        alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
    },
};

export const SUCCESS = () => {
    setTimeout(() => {
        alert('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇');
    }, 2000)
};