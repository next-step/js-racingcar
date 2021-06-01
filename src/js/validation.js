function checkNames(carsName = "") {
  const splitNames = carsName.split(",");
  return splitNames.every((name) => name && name.trim().length <= 5);
}

function checkTimes(times) {
  return times > 0;
}

function errorAlert(error) {
  return alert(ERROR_MSG[error]);
}
