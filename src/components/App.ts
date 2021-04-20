import { ID } from "../common/constants";
import Component from "../core/Component";
import UserInput from "./UserInput";
import GameProcess from "./GameProcess";
import GameResult from "./GameResult";
import { id2Query } from "../common/utils";

export default class App extends Component {
  private userInputComp?: UserInput;
  private gameProcessComp?: GameProcess;
  private gameResultComp?: GameResult;

  constructor($target: HTMLElement) {
    super($target);
  }

  componentDidMount() {
    const onInputUserData = (carNames: string[], raceTimes: number) => {
      const carProps = carNames.map((carName) =>
        this.gameProcessComp!.createDefaultCarProps(carName)
      );
      this.gameProcessComp!.setState({ carProps, raceTimes });
      this.gameProcessComp!.playGame();
    };

    this.userInputComp = new UserInput(
      this.$target.querySelector(
        id2Query(ID.UserInputComponent)
      ) as HTMLElement,
      { onInputUserData }
    );
    this.gameProcessComp = new GameProcess(
      this.$target.querySelector(
        id2Query(ID.GameProcessComponent)
      ) as HTMLElement
    );
    this.gameResultComp = new GameResult(
      this.$target.querySelector(
        id2Query(ID.GameResultComponent)
      ) as HTMLElement
    );
  }

  getInnerHTML() {
    return `
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <section id="${ID.UserInputComponent}" class="d-flex justify-center mt-5">
      </section>
      <section id="${ID.GameProcessComponent}"class="d-flex justify-center mt-5">
      </section>
      <section id="${ID.GameResultComponent}" class="d-flex justify-center mt-5">
        <div class="game-result"></div>
      </section>
    `;
  }
}
