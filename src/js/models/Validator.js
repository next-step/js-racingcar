import { CAR_NAME_MAX_LENGTH } from "../constant/index.js";

const Validator = {
  isValidCarNameLength(names) {
    return names.every(name => name.length <= CAR_NAME_MAX_LENGTH);
  },

  isUniqueCarNames(names) {
    const nameCount = names.filter(name => name !== "").length;
    const uniqueNameCount = new Set(names).size;

    return nameCount === uniqueNameCount;
  },
};

export default Validator;
