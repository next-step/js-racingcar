import {$} from '../utils/element.js';
import {ComponentParam} from "../types/common.js";

interface EventListenerModel {
    selector?: string,
    eventType: string,
    callback: (event: Event) => void,
}

interface ChildComponent {
    selector: string,
    props?: object,
    renderComponent: ({$el, props}: ComponentParam<object>) => void,
}

interface RenderParam {
    $el: HTMLElement,
    template: string,
    eventListenerModels?: EventListenerModel[],
    childComponents?: ChildComponent[],
}

const render = ({$el, template, eventListenerModels = [], childComponents = []}: RenderParam) => {

    const $temp = document.createElement('template');
    $temp.insertAdjacentHTML('beforeend', template);

    childComponents.forEach(({selector, props = {}, renderComponent}) => {
        renderComponent({$el: $(selector, $temp), props});
    });

    $el.replaceChildren(...$temp.children);

    eventListenerModels.forEach(({selector, eventType, callback}) => {
        const eventBindingEl = selector ? $el.querySelector(selector) : $el;
        eventBindingEl.addEventListener(eventType, callback);
    });
};

export default {
    render,
}
