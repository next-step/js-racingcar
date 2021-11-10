import Component from "../componentClass.js";

export default class ResultComponent extends Component{
    constructor(component, store, changeStep) {
        super(component, store);
        this.changeStep = changeStep;
        this.winners = [];
        this.render();
    }

    eventHandler(){
        const button = this.component.querySelector('button');
        button.addEventListener('click', () => {
            this.changeStep(0);
        });
    }
    lank(winners){
        this.winners = winners;
        this.render();
    }

    render() {
        super.render(`
            <div>
                <h2>🏆 최종 우승자: ${this.winners.join(", ") || ""}  🏆</h2>
                <div class="d-flex justify-center">
                    <button type="button" class="btn btn-cyan">다시 시작하기</button>
                </div>
            </div>
        `);
        this.eventHandler();
    };
}