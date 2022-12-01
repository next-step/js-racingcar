import { NAME, SELECTOR } from '../constants';
import View from './View';

export default class ProcessView extends View {
 constructor(target, model) {
  super(target, model);
  this.model.subscribe(this.render.bind(this));
 }

 #getCarTemplate([carName, carPosition]) {
  return String.raw`<div class="mr-2">
    <div class="car-player">${carName}</div>
    ${Array.from(
     { length: carPosition },
     () => '<div class="forward-icon mt-2">⬇️️</div>'
    ).join('')}
    
    ${
     this.model.isFinished()
      ? ''
      : `<div class="mt-2 d-flex justify-center">
    <div class="relative spinner-container">
    <span class="d-flex material spinner"></span>
    </div>
    </div>`
    }
    </div>
`;
 }
 getTemplate() {
  const positions = this.model.getCarsPosition();
  return String.raw`<div class="mt-4 d-flex">
    ${positions.map((value) => this.#getCarTemplate(value)).join('')}
</div>`;
 }
}
