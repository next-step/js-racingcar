export const $ = (selector, container = document) =>
  container.querySelector(selector);

export const hide = ($el, hide) => {
  const key = hide ? 'add' : 'remove';
  $el.classList[key]('hide');
};

/**
 *
 * Q: window.setTimeout 을 하지 않으면 focus 가 발생하지 않아서 이렇게 처리하였는데
 * 혹시 다른 방법이 있을까요??
 */
export const focus = ($el) => window.setTimeout(() => $el.focus(), 0);

export const disabled = ($el, use) =>
  use ? $el.setAttribute('disabled', true) : $el.removeAttribute('disabled');
