export class Result{
    constructor(component, store) {
        this.component = component;
        this.winners = [];
        this.store = store;
        this.render();
    }

    eventHandler(){
        const button = this.component.querySelector('button');
        button.addEventListener('click', () => {
            this.store.step = 0;
        });
    }
    lank(winners){
        this.winners = winners;
        this.render();
    }

    render() {
        this.component.innerHTML = `
            <div>
                <h2>🏆 최종 우승자: ${this.winners.join(", ") || ""}  🏆</h2>
                <div class="d-flex justify-center">
                    <button type="button" class="btn btn-cyan">다시 시작하기</button>
                </div>
            </div>
        `;
        this.eventHandler();
    };
}