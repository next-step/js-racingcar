import { ID } from "../common/constants";
import Component from "../core/Component";
import UserInput from "./UserInput";
import GameProcess from "./GameProcess";
import GameResult from "./GameResult";
import { delay } from "../common/utils";
import { $, id2Query } from "../common/dom";

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
      $(id2Query(ID.UserInputComponent), this.$target),
      { onInputUserData }
    );
    this.gameProcessComp = new GameProcess(
      $(id2Query(ID.GameProcessComponent), this.$target)
    );
    this.gameResultComp = new GameResult(
      $(id2Query(ID.GameResultComponent), this.$target),
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
