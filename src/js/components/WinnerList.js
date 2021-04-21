import { createElement } from "../utils/utils.js";
import $store from "../store/index.js";

const template = (winners) => `
  🏆 최종 우승자: ${winners.join(", ")} 🏆
`;

export default function WinnerList(target) {
  const dom = createElement(target);

  const init = () => {
    $store.game.subscribe("winner", render);
  };

  const render = () => {
    const winners = $store.game.getWinnerNames();

    dom.innerText = template(winners);
  };

  init();

  return dom;
}
