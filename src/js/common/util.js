/**
 * @param {number} num - 만들고자 하는 배열의 길이.
 */
export const arr = (num) => Array(num).fill(0);

/**
 * @param {number} min - 랜덤숫자의 최소 범위.
 * @param {number} max - 랜덤숫자의 최대 범위.
 */
export const getRandom = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

/**
 * @param {any} item - 깊은 복사의 대상.
 */
export const deepCopy = (item) => JSON.parse(JSON.stringify(item));

/**
 * @param {string} element - 파싱하고자 하는 HTML 형태의 스트링
 */
export const parseStringToHTML = (element) => {
    const parser = new DOMParser().parseFromString(element, 'text/html');
    return parser.body.children[0];
}

/**
 * @param {HTMLButtonElement} $button - disabled 시킬 HTML 버튼 요소
 */
export const disableButton = ($button) => $button.disabled = true;

/**
 * @param {Element[]} $elements - display: none 시킬 요소의 배열
 */
export const displayNone = ($elements) => $elements.forEach($el => $el.style.display = 'none');

/**
 * @param {Element[]} $elements - display: block 시킬 요소의 배열
 */
export const displayBlock = ($elements) => $elements.forEach($el => $el.style.display = 'block');

/**
 * @param {HTMLInputElement} $element - focus 를 줄 HTML Input 요소
 */
export const setFocus = ($element) => $element.focus();

/**
 * @param {HTMLElement} $element - innerHTML 을 적용시켜줄 HTML 대상 요소
 * @param {string} value - innerHTML 에 적용될 값
 */
export const renderInnerHtml = ($element, value) => $element.innerHTML = value;

/**
 * @param {HTMLElement} $parent - append 를 적용할 부모 HTML 요소
 * @param {HTMLElement} $child - append 를 적용할 자식 HTML 요소
 */
export const appendElement = ($parent, $child) => $parent.append($child);