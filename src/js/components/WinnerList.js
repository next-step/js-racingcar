import { $, setSelectorHidden } from "../utils/util.js";

const $winnerList = $("#winnerList");

export const WinnerList = () => {
  setSelectorHidden($winnerList, true);
};
