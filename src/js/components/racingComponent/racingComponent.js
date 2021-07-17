import {Car} from "./carComponent.js";
import Component from "../componentClass.js";

export default class RacingComponent extends Component{
    constructor(component, children){
        super(component);
        this.children = children;
    }
    refresh(children){
        this.children = children;
        this.render();
    }

    render() {
        super.render(`
            <section class="mt-4">
                <div class="d-flex">
                ${  
                    this.children ? 
                    this.children.map(child => Car(child.name, child.cnt, child.finished)).join("")
                    : ""
                }
                </div>
            </section>
        `);
    }
};