import { MAX_RANDOM_NUMBER } from '../racingcar/constatns/values';

const randomNumber = () => Math.floor(Math.random() * MAX_RANDOM_NUMBER + 1);

export { randomNumber };
