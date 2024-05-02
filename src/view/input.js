import { CONSOLE_MESSAGES } from "../constants/messages";
import { Console } from "../utils/console";

export const input = {
  carName: async () => await Console.input(CONSOLE_MESSAGES.START),
};
