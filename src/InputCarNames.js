const ERROR_MESSAGE = Object.freeze({
  NO_INPUT_STRING: "사용자 입력이 없어 프로그램을 종료합니다.",
  INVALID_NAME: "유효하지 않은 이름: ${}\n유효하지 않은 이름이 입력되어 프로그램을 종료합니다.",
  NAME_LENGTH_EXCEED: "5자가 넘는 이름이 있어 프로그램을 종료합니다.",
});

const NAME_LENGTH_LIMIT = 5;

const findInValidName = (nameList) => {
  const re = /[ㄱ-ㅎㅏ-ㅣ]/gi;
  const invalidNameString = nameList?.reduce((acc, cur) => {
    if (cur.search(re) === -1) return acc;
    return acc + cur + ",";
  }, "");

  if (invalidNameString) return invalidNameString.slice(0, -1);
};

const renameDuplicateNames = (nameList) => {
  const nameObject = {};
  const returnNameList = [];

  nameList?.forEach(($name) => {
    if (!nameObject[$name]) return (nameObject[$name] = 1);
    return (nameObject[$name] += 1);
  });

  for (const [key, value] of Object.entries(nameObject)) {
    if (value === 1) {
      returnNameList.push(key);
      delete nameObject[key];
    }
  }

  for (const [key, value] of Object.entries(nameObject)) {
    for (let i = 0; i < value; i++) {
      returnNameList.push(`${key}${i + 1}`);
    }
  }

  return returnNameList;
};

const InputCarNames = (nameString) => {
  if (!nameString) return ERROR_MESSAGE.NO_INPUT_STRING;

  const splitedNameList = nameString
    .split(",")
    .map(($name) => $name.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, ""));

  for (const name of splitedNameList) {
    if (name.length > NAME_LENGTH_LIMIT) return ERROR_MESSAGE.NAME_LENGTH_EXCEED;
  }

  const invalidName = findInValidName(splitedNameList);
  if (invalidName) return ERROR_MESSAGE.INVALID_NAME.replace("${}", invalidName);

  const rename = renameDuplicateNames(splitedNameList);
  return rename;
};

export default InputCarNames;
