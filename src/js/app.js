import InputWrapperComponent from "./components/inputComponent/inputWrapperComponent.js";
import RacingComponent from "./components/racingComponent/racingComponent.js";
import ResultComponent from './components/resultComponent/resultComponent.js';
import Store from './store.js';
import { SUCCESS } from "./utils/message.js";
import Component from "./components/componentClass.js";

export default class App extends Component{
    constructor(component){
        super(component, Store());
    }
    
    init() {
        this.render();
        this.changeStep(0);
    }
    changeStep(value) {
        if(value === 0) {
            this.store.step = () => {
                this.input.display(true,false, 0);
                this.racing.display(false);
                this.result.display(false);
            };
        } else if(value === 1) {
            this.store.step = () => {
                this.input.display(true,true, 1);
                this.racing.display(false);
                this.result.display(false);
            };
        } else if (value === 2) {
            this.store.step = () => {
                this.input.display(true,true);
                this.racing.display(true);
                this.result.display(false);
                this.raceStart();
            };
        } else if (value === 3) {
            this.store.step = () => {
                this.input.display(true,true);
                this.racing.display(true);
                this.result.display(true);
            };
        }
    }
    raceStart(){
        let cars = this.store.carList.map(car => ({
            name : car,
            cnt : 0,
            finished : false
        }));

        this.racing.refresh(cars);

        const interval = setInterval(() => {
            cars = cars.map(car => ({
                ...car,
                cnt : Math.floor(Math.random()*10) >= 4 ? car.cnt + 1 : car.cnt
            }));

            this.racing.refresh(cars);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            this.racing.refresh(cars.map(car => ({
                ...car,
                finished : true
            })));

            //내림차순 정렬
            cars.sort((a,b) => b.cnt - a.cnt);

            //가장 앞선 차들의 이름 배열을 lank에 할당.
            const lank = cars
            .filter(e => e.cnt === cars[0].cnt)
            .map(e => e.name);

            this.result.lank(lank);
            this.changeStep(3);

            SUCCESS();

        }, this.store.repeatCnt * 1000);

    }

    setElement(){
        const section = this.component.querySelectorAll('.d-flex.justify-center.mt-5');
        
        this.input = new InputWrapperComponent(section[0], this.store, this.changeStep.bind(this));
        this.racing = new RacingComponent(section[1], []);
        this.result = new ResultComponent(section[2], this.store, this.changeStep.bind(this));
        
    }
    render() { 
        super.render(`
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <section class="d-flex justify-center mt-5">
            </section>
            
            <div  id="game-process-component" class="d-flex justify-center mt-5">
            </div>

            <div class="d-flex justify-center mt-5">
            </div>

            <div class="d-flex justify-center mt-5"/>
            </div>
        `);
        this.setElement();
    };
};



