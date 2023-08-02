import startGame from './startGame';
import { CarPrompter } from './classes/index';

const prompt = new CarPrompter();
prompt.executeReadInput(startGame);
