// 하나의 track을 가져야 함.
// state를 받아 계속해서 element를 바꿔야하기 때문에 View로서 가지고 있는다.
import { createArrowElement } from "./createArrowElement.js";
import { createSpinElement } from "./createSpinElement.js";

class OneTrack {
  rootElement;
  titleElement;

  constructor(title) {
    const rootElement = document.createElement('div');
    rootElement.classList.add('mr-2');
    this.rootElement = rootElement;

    const titleElement = document.createElement('div');
    titleElement.classList.add('car-player');
    titleElement.textContent = title;
    this.titleElement = titleElement;
    rootElement.appendChild(this.titleElement);
    rootElement.appendChild(createSpinElement());
  }

  moveForward = () => {
    const rootElement = this.rootElement;
    const lastChildrenIndex = rootElement.childElementCount - 1;
    rootElement.insertBefore(createArrowElement(), rootElement.children[lastChildrenIndex]);
  };
}

export { OneTrack };
