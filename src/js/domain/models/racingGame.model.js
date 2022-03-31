import { declareInterface } from '../../@helper/index.js';

const RacingGameModelProps = {
  cars: [],
  tryCount: 0,
  maxTryCount: 0,
};

export default declareInterface(RacingGameModelProps);
