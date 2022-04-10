const $wrapper = document.createElement('template');

export const $element = html => {
  $wrapper.replaceChildren();
  $wrapper.insertAdjacentHTML('afterbegin', html);
  return $wrapper.firstElementChild;
};

export const $show = target => {
  document.querySelector(target).classList.remove('hidden');
};

export const $disabled = target => {
  document.querySelector(target).setAttribute('disabled', true);
};

export const $focus = target => {
  document.querySelector(target).focus();
};

export const $setAttributes = ({ target, attrs }) => {
  attrs.forEach(({ attr, value }) => {
    document.querySelector(target).setAttribute(attr, value);
  });
};
