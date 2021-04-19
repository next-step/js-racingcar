import Component from "../core/Component";

const CarIndicatorHTML = `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
`;

export interface CarProps {
  name: string;
  forwardedCnt: number;
  isForwarding: boolean;
}

export class Car extends Component<CarProps> {
  constructor($target: HTMLElement, props: CarProps) {
    super($target, props);
  }

  getInnerHTML() {
    const forwardedHTML = new Array(this.props?.forwardedCnt)
      .fill(`<div class="forward-icon mt-2">⬇️️</div>`)
      .join("");

    return `
            <div class="car-player">${this.props?.name}</div>
            ${forwardedHTML}
            ${this.props?.isForwarding ? CarIndicatorHTML : ""}
      `;
  }
}
