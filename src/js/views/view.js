export class View {
    constructor() {}

    parseStringToHTML = (element) => {
        const parser = new DOMParser().parseFromString(element, 'text/html');
        return parser.body.children[0];
    }

    disableButton = ($button) => {
        $button.disabled = true;
    }

    displayNone = ($elements) => $elements.forEach($el => $el.style.display = 'none');
    displayBlock = ($elements) => $elements.forEach($el => $el.style.display = 'block');

    setFocus($element) {
        $element.focus();
    }

    renderInnerHtml = ($element, value) => {
        $element.innerHTML = value;
    }

    append = ($parent, $child) => {
        $parent.append($child);
    }
}