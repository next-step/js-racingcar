import { Racing } from "./components/racingComponent.js";
import CarInput from "./components/carInputComponent.js";
import {Store} from './store.js';
import RepeatInput from "./components/repeatInputComponent.js";
import {Result} from './components/resultComponent.js';
import { SUCCESS } from "./message.js";

export default class App {
    constructor(component){
        this.component = component;
        this.store = Store.apply(this);
        this.init();
    }
    
    init() {
        this.render();
        this.store.step = 0;
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
            const lank = cars.reduce((prev, next, idx) => {
                if(prev[0].cnt === next.cnt && idx !== 0){
                    return [...prev, next];
                }else {
                    return prev;
                }
            }, [cars[0]])
            .map(e => e.name);

            this.result.lank(lank);
            this.store.step = 3;

            SUCCESS();

        }, this.store.repeatCnt * 1000);

    }

    setElement(){
        const fieldset = this.component.querySelectorAll('fieldset');
        const section = this.component.querySelectorAll('.d-flex.justify-center.mt-5');

        const carInput = fieldset[0];
        this.carInput = new CarInput(carInput, this.store);
        const repeatInput = fieldset[1];
        this.repeatInput = new RepeatInput(repeatInput, this.store);
        const racing = section[1];
        this.racing = new Racing(racing, []);
        const result = section[2];
        this.result = new Result(result, this.store);
        
    }
    render() { 
        this.component.innerHTML = `
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <section class="d-flex justify-center mt-5">
            <form>
                <fieldset>
                </fieldset>
                <fieldset>
                </fieldset>
            </form>
        </section>
        
        <div  id="game-process-component" class="d-flex justify-center mt-5">
        </div>

        <div class="d-flex justify-center mt-5">
        </div>

        <div class="d-flex justify-center mt-5"/>
        </div>
        `;
        this.setElement();
    };
};



