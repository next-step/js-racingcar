import Component from "../core/Component";
import GameForm from "./GameForm";
import GamePlay from "./GamePlay";
import GameResult from "./GameResult";

export default class App extends Component {
  private gameFormComp?: GameForm;
  private gamePlayComp?: GamePlay;
  private gameResultComp?: GameResult;

  constructor($target: Element | null) {
    super($target);
  }

  componentDidMount() {
    this.gameFormComp = new GameForm(document.querySelector(".game-form"));
    this.gamePlayComp = new GamePlay(document.querySelector(".game-play"));
    this.gameResultComp = new GameResult(
      document.querySelector(".game-result")
    );
  }

  getInnerHTML() {
    return `
      <section class="d-flex justify-center mt-5">
        <form class="game-form"></form>
      </section>
      <section class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex game-play"></div>
      </section>
      <section class="d-flex justify-center mt-5">
        <div class="game-result"></div>
      </section>
    `;
  }
}
