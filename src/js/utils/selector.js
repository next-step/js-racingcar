const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};
const $$ = (selector, parent = document) => {
    return parent.querySelectorAll(selector);
};

export {
    $,
    $$,
};
