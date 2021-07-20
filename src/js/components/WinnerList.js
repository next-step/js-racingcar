import { $, setSelectorHidden } from "../utils/util.js";

const $winnerList = $("#winnerList");

export const WinnerList = () => {
  setSelectorHidden($winnerList, true);
};

export const setWinnerList = (input) => {
  setSelectorHidden($winnerList, false);
  console.log(input);
  $("#winnerList h2").innerText = `🏆 최종 우승자: ${input.toString()}🏆`;
};
