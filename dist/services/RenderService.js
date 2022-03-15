import { $ } from '../utils/element.js';
const render = ({ $el, template, eventListenerModels = [], childComponents = [] }) => {
    const $temp = document.createElement('template');
    $temp.insertAdjacentHTML('beforeend', template);
    childComponents.forEach(({ selector, props = {}, renderComponent }) => {
        renderComponent({ $el: $(selector, $temp), props });
    });
    $el.replaceChildren(...$temp.children);
    eventListenerModels.forEach(({ selector, eventType, callback }) => {
        const eventBindingEl = selector ? $el.querySelector(selector) : $el;
        eventBindingEl.addEventListener(eventType, callback);
    });
};
export default {
    render,
};
//# sourceMappingURL=RenderService.js.map