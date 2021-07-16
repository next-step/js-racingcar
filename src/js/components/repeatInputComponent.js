
import { ERROR } from "../message.js";
export default class RepeatInput{
    constructor(component, store){
        this.component = component;
        this.store = store;
        this.init();
    }
    init(){
        this.render();
        const input = this.component.querySelector("input");
        input.focus();
        input.value = "";
        this.disable(false);
        this.state = {
            repeatCnt : -1
        };
    }
    disable(flag) {
        const input = this.component.querySelector("input");
        const button = this.component.querySelector("button");
        input.disabled = true === flag;
        button.disabled = true === flag;
    }
    handleCntChange(e) {
        const input = this.component.querySelector("input");
        this.state.repeatCnt = Number.parseInt((input.value || 0));
    }
    handleStartClick(e) {
        if(this.state.repeatCnt < 0) {
            ERROR.RACING_CNT();
            return;
        }
        this.disable(true);
        this.store.repeatCnt = this.state.repeatCnt;
        this.store.step = 2;
    }

    eventHandler(){
        const input = this.component.querySelector("input");
        const button = this.component.querySelector("button");
        

        input.addEventListener('change', e => {
            this.handleCntChange(e);
        });

        input.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                button.focus();
            }
        });

        button.addEventListener('click', e => {
            this.handleStartClick(e);
        });
    }
    render(){
        this.component.innerHTML = `
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
                <input type="number" class="w-100 mr-2" placeholder="시도 횟수"/>
                <button type="button" class="btn btn-cyan">확인</button>
            </div>`; 
            this.eventHandler();
    }

}