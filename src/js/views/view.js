export class View {
    constructor() {
    }

    disableButton = ($button) => {
        $button.disabled = true;
    }

    displayNone = ($elements) => $elements.forEach($el => $el.style.display = 'none');
    displayBlock = ($elements) => $elements.forEach($el => $el.style.display = 'block');
}