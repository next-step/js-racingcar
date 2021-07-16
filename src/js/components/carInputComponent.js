
import { ERROR } from "../message.js";
export default class CarInput{
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
            carStr : ''
        };
    }
    disable(flag) {
        const input = this.component.querySelector("input");
        const button = this.component.querySelector("button");
        input.disabled = true === flag;
        button.disabled = true === flag;
    }
    handleNameChange(e){
        this.state.carStr = this.component.querySelector("input").value;
    }
    handleNameClick(e){
        if(this.state.carStr.length === 0) {
            ERROR.NAME_LENGTH();
            return;
        }
        const carList = this.state.carStr.split(" ").join("").split(',');
        if(carList.findIndex(car => car.length > 5) !== -1) {
            ERROR.NAME_LENGTH();
            return;
        }
        this.store.carList = carList;
        this.disable(true);
        this.store.step = 1;
    }
    eventHandler(){
        const input = this.component.querySelector("input");
        const button = this.component.querySelector("button");

        input.addEventListener('change', e => {
            this.handleNameChange(e);
        });

        input.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                button.focus();
            }
        });

        button.addEventListener('click', e => {
            this.handleNameClick(e);
        });
    }
    render(){
        this.component.innerHTML = `
            <p>
                5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
                예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
                <input type="text" class="w-100 mr-2" placeholder="자동차 이름" autofocus/>
                <button type="button" class="btn btn-cyan">확인</button>
            </div>`;
        this.eventHandler();
    }
}

