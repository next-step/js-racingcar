import Component from "../componentClass.js";
import InputComponent from "./inputComponent.js";
import {ERROR} from '../../utils/message.js'

export default class InputWrapperComponent extends Component{
    constructor(component, store, changeStep){
        super(component, store, {
            carStr : '',
            repeatCnt : -1
        });
        this.changeStep = changeStep;
    }

    init() {
        this.render();
    }
    
    display(carInputFlag, repeatInputFlag, step) {
        this.carInput.component.style.display = carInputFlag === true ?  "" : "none";
        this.repeatInput.component.style.display = repeatInputFlag === true ?  "" : "none";

        if(step === 0) {
            this.carInput.focus();
            this.state = {
                carStr : '',
                repeatCnt : -1
            };
        } else if(step === 1) {
            this.repeatInput.focus();
        }
    }
    handleNameChange(e){
        this.state.carStr = this.carInput.component.querySelector("input").value;
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
        this.carInput.disable(true);
        this.changeStep(1);
        this.repeatInput.focus();
    }

    handleCntChange(e) {
        const input = this.repeatInput.component.querySelector("input");
        this.state.repeatCnt = Number.isInteger(+input.value) ? +input.value : 0;
    }
    handleStartClick(e) {
        if(this.state.repeatCnt < 1) {
            ERROR.RACING_CNT();
            return;
        }
        this.repeatInput.disable(true);
        this.store.repeatCnt = this.state.repeatCnt;
        this.changeStep(2);
    }

    eventHandler() {
        const [carInput, repeatInput] = this.component.querySelectorAll("input");
        const [carButton, repeatButton] = this.component.querySelectorAll("button");

        carInput.addEventListener('change', e => {
            this.handleNameChange(e);
        });

        carInput.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                carButton.focus();
            }
        });

        carButton.addEventListener('click', e => {
            this.handleNameClick(e);
        });


        repeatInput.addEventListener('change', e => {
            this.handleCntChange(e);
        });

        repeatInput.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                repeatButton.focus();
            }
        });

        repeatButton.addEventListener('click', e => {
            this.handleStartClick(e);
        });
    }

    setElement() {
        const fieldset = this.component.querySelectorAll('fieldset');
        const carInput = fieldset[0];
        this.carInput = new InputComponent(carInput, this.store, `
            <p>
                5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
                예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
                <input type="text" class="w-100 mr-2" placeholder="자동차 이름" autofocus/>
                <button type="button" class="btn btn-cyan">확인</button>
            </div>
        `);
        const repeatInput = fieldset[1];
        this.repeatInput = new InputComponent(repeatInput, this.store, `
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
                <input type="number" class="w-100 mr-2" placeholder="시도 횟수"/>
                <button type="button" class="btn btn-cyan">확인</button>
            </div>
        `);
    }
    
    render() {
        super.render(`
            <form>
                <fieldset>
                </fieldset>
                <fieldset>
                </fieldset>
            </form>
        `);
        this.setElement();
        this.eventHandler();
    }
}