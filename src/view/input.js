import { CONSOLE_MESSAGES } from "../constants/messages";
import { Console } from "../utils/console";

export const input = {
  carName: async () => await Console.input(CONSOLE_MESSAGES.START),

  tryCount: async () => await Console.input(CONSOLE_MESSAGES.TRY_COUNT),
};
