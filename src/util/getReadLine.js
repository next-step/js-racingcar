import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

export const terminal = readline.createInterface({
  input,
  output,
});
