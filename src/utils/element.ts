export const $ = (selector: string, $parent: Element | Document = document): HTMLElement | null => {
    return $parent.querySelector(selector);
};

export const $$ = (selector: string, $parent: Element | Document = document): NodeListOf<HTMLElement> => {
    return $parent.querySelectorAll(selector);
};

