import Component from '../componentClass.js';

export default class InputComponent extends Component{
    constructor(component, store, innerHTML){
        super(component, store, null, innerHTML);
    }
    init(){
        this.render();
        this.focus();
    }
    
    focus(){
        const input = this.component.querySelector("input");
        input.focus();
        input.value = "";
        this.disable(false);
    }

    disable(flag) {
        const input = this.component.querySelector("input");
        const button = this.component.querySelector("button");
        input.disabled = true === flag;
        button.disabled = true === flag;
    }
    render(){
        super.render(this.innerHTML);
        this.eventHandler();
    }
}

