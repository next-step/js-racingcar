import { ID } from "../common/constants";
import Component from "../core/Component";
import UserInput from "./UserInput";
import GameProcess from "./GameProcess";
import GameResult from "./GameResult";
import { delay, id2Query } from "../common/utils";

export default class App extends Component {
  private userInputComp?: UserInput;
  private gameProcessComp?: GameProcess;
  private gameResultComp?: GameResult;

  constructor($target: HTMLElement) {
    super($target);
  }

  restart() {
    this.userInputComp?.reset();
    this.gameProcessComp?.reset();
    this.gameResultComp?.reset();
  }

  componentDidMount() {
    const onInputUserData = async (carNames: string[], raceTimes: number) => {
      const carProps = carNames.map((carName) =>
        this.gameProcessComp!.createDefaultCarProps(carName)
      );
      this.gameProcessComp!.setState({ carProps, raceTimes });
      const interval = 1000;
      const winners = await this.gameProcessComp!.playGame(interval);
      this.gameResultComp!.setState({ canShowResult: true, winners });
      await delay(2000);
      this.gameResultComp!.showClearPopup();
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
      ) as HTMLElement,
      { restart: () => this.restart() }
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
      </section>
    `;
  }
}
