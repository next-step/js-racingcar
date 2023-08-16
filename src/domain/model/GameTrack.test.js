// Given, When, Then
import GameTrack from "./GameTrack";

import { ERROR_MESSAGE, NO_EMPTY_NAME } from "../../constants/errorMessage";
import { NO_DUPLICATE_NAME } from "../../constants/errorMessage";
import { getRandomNumber } from "../../utils/helpers";
import { RACE_FORWARD_RANDOM_NUMBER_LIMIT } from "../../constants/rules";

jest.mock("../../utils/helpers.js");

let gameTrack;

beforeEach(() => {
  gameTrack = new GameTrack();
});

describe("GameTrack domain - Setting car list", () => {
  test("Should set game car list correctly", () => {
    // Given
    const carNames = "kim, frank, happy";

    // When
    gameTrack.setGameCarList(carNames);

    // Then
    expect(gameTrack.gameStatus).toEqual([
      { carName: "kim", forward: 0 },
      { carName: "frank", forward: 0 },
      { carName: "happy", forward: 0 },
    ]);
  });

  test("Should throw Error if empty name ", () => {
    // Given
    const carNames = "kim, , happy";

    // When -> Then
    expect(() => gameTrack.setGameCarList(carNames)).rejects.toThrowError(
      ERROR_MESSAGE[NO_EMPTY_NAME]
    );
  });

  test("Should throw Error if duplicate name ", () => {
    // Given
    const carNames = "kim, frank, frank";

    // When -> Then
    expect(() => gameTrack.setGameCarList(carNames)).rejects.toThrowError(
      ERROR_MESSAGE[NO_DUPLICATE_NAME]
    );
  });
});

describe("GameTrack domain - Setting cars moving forward", () => {
  test("Should ONLY move forward when getRandomNumber is greater than RACE_FORWARD_RANDOM_NUMBER_LIMIT", () => {
    // Given
    getRandomNumber.mockReturnValue(RACE_FORWARD_RANDOM_NUMBER_LIMIT + 1);
    gameTrack.setGameCarList("frank, kim, happy");

    // When
    gameTrack.setAdvanceCarsForward();

    // Then
    expect(gameTrack.gameStatus[0].forward).toBe(1);
    expect(gameTrack.gameStatus[1].forward).toBe(1);
    expect(gameTrack.gameStatus[2].forward).toBe(1);
  });

  test("Should NOT move forward when getRandomNumber is less than RACE_FORWARD_RANDOM_NUMBER_LIMIT", () => {
    // Given
    getRandomNumber.mockReturnValue(RACE_FORWARD_RANDOM_NUMBER_LIMIT - 1);
    gameTrack.setGameCarList("frank, kim, happy");

    // When
    gameTrack.setAdvanceCarsForward();

    // Then
    expect(gameTrack.gameStatus[0].forward).toBe(0);
    expect(gameTrack.gameStatus[1].forward).toBe(0);
    expect(gameTrack.gameStatus[2].forward).toBe(0);
  });
});
