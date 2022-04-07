import { CAR_NAME_MAX_LENGTH } from "../constant/index.js";

const Validator = {
  validateCarNames: function (names) {
    return names.every(name => name.length <= CAR_NAME_MAX_LENGTH);
  },
};

export default Validator;
