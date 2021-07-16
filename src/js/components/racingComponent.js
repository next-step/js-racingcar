import {Car} from "./carComponent.js";

export class Racing{
    constructor(component){
        this.component = component;
    }
    refresh(children){
        this.children = children;
        this.render();
    }

    render() {
        this.component.innerHTML = `
            <section class="mt-4">
                <div class="d-flex">
                ${  
                    this.children ? 
                    this.children.map(child => Car(child.name, child.cnt, child.finished)).join("")
                    : ""
                }
                </div>
            </section>`;
    }
};