import { ViewComponents } from "../controller/racing.controller";
import { State } from "./Racing.state";

const css = String.raw;

export const setStyle = (state: State) => {
  const {
    GameCountFieldset,
    RacingRoadSection,
    WinnerSection,
    CarNameButton,
    GameCountInput,
    GameCountButton,
    CarNameInput,
  } = ViewComponents;
  switch (state._t) {
    case "idle":
      GameCountFieldset.style.cssText = css`
        display: none;
      `;

      RacingRoadSection.style.cssText = css`
        display: none;
      `;

      WinnerSection.style.cssText = css`
        display: none;
      `;

      CarNameInput.disabled = false;
      CarNameButton.disabled = false;
      GameCountInput.disabled = false;
      GameCountButton.disabled = false;
      return;

    case "insert_cars":
      GameCountFieldset.style.cssText = css`
        display: block;
      `;
      CarNameInput.disabled = true;
      CarNameButton.disabled = true;

      return;

    case "insert_game_count":
      RacingRoadSection.style.cssText = css`
        display: flex;
      `;
      GameCountInput.disabled = true;
      GameCountButton.disabled = true;
      return;

    case "set_winner":
      WinnerSection.style.cssText = css`
        display: flex;
      `;
      return;
  }
};
