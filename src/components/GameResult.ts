import { AlertMsg, ClassName } from "../common/constants";
import { class2Query } from "../common/utils";
import Component from "../core/Component";

interface GameResultProps {
  restart(): void;
}

interface GameResultState {
  canShowResult?: boolean;
  winners?: string[];
}
const defaultState: GameResultState = {
  canShowResult: false,
  winners: [],
};
export default class GameResult extends Component<GameResultProps> {
  private state?: GameResultState;
  constructor($target: HTMLElement, props?: GameResultProps) {
    super($target, props);
    this.state = { ...defaultState };
  }

  reset() {
    this.setState(defaultState);
  }

  componentInit() {
    this.bindEvents();
  }

  bindEvents() {
    const onClick = (e: MouseEvent) => {
      const $btn = (e.target as HTMLElement).closest(
        class2Query(ClassName.Btn)
      );
      if (!$btn) {
        return;
      }
      this.props?.restart();
    };

    this.$target.addEventListener("click", onClick);
  }

  showClearPopup() {
    alert(AlertMsg.Clear);
  }

  setState(nextState: GameResultState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  getInnerHTML() {
    if (!this.state?.canShowResult) {
      return ``;
    }

    return `
        <div>
          <h2>🏆 최종 우승자: ${this.state.winners!.join(", ")} 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
    `;
  }
}
